//Dependencies
const data = require("./data");
const url = require('url');
const http = require("http");
const https = require("https");
const { sendTwilioSms } = require("../helpers/notifications");
const { parseJSON } = require("../helpers/utilities");

const worker = {}


// lookup all the checks

worker.gatherAllChecks = () => {
    //get all the checks
    data.list("checks", (err, checks) => {
        if (!err && checks && checks.length > 0) {
            checks.forEach((check) => {
                //read the check Data
                data.read("checks", check, (err2, originalCheckData) => {
                    if (!err2 && originalCheckData) {
                        // pas the data to the check validator
                        worker.validateCheckData(parseJSON(originalCheckData));
                    } else {
                        console.log("Error: reading one of the check data!");
                    }
                });
            });
        } else {
            console.log("Error: Could not file find and checks to process!");
        }
    });
};


//Validate individual check data
worker.validateCheckData = (originalCheckData) => {
    if (originalCheckData && originalCheckData.id) {
        originalCheckData.state =
            typeof originalCheckData.state === "string" &&
                ["up", "down"].indexOf(originalCheckData.state) > -1
                ? originalCheckData.state
                : "down";

        originalCheckData.lastChecked =
            typeof originalCheckData.lastChecked === "number" &&
                originalCheckData.lastChecked > 0
                ? originalCheckData.lastChecked
                : false;

        //pass to the next process
        worker.performCheck(originalCheckData);
    } else {
        console.log("Error: Check was invalid or not properly formatted");
    }
};

//perform check
worker.performCheck = (originalCheckData) => {
    //Prepare the initial check outcome
    let checkOutCome = {
        error: false,
        responseCode: false,
    };
    //mark the outcome has not been sent yer
    let outcomeSent = false;
    //parse the hostname & full url from original data
    const parsedUrl = url.parse(
        `${originalCheckData.protocol}://${originalCheckData.url}`,
        true,
    );
    const hostName = parsedUrl.hostname;
    const { path } = parsedUrl;

    //construct the request
    const requestDetails = {
        protocol: `${originalCheckData.protocol}:`,
        hostname: hostName,
        method: originalCheckData.method.toUpperCase(),
        path,
        timeout: originalCheckData.timeoutSeconds * 1000,
    };
    const protocolToUse = originalCheckData.protocol === "http" ? http : https;
    const req = protocolToUse.request(requestDetails, (res) => {
        //Status
        const status = res.statusCode;
        //update the checks outcome and past to the next process
        checkOutCome.responseCode = status;
        if (!outcomeSent) {
            worker.processCheckOutCome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });


    req.on("error", (e) => {
        checkOutCome = {
            error: true,
            value: e,
        };
        if (!outcomeSent) {
            worker.processCheckOutCome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });

    req.on("timeout", (e) => {
        checkOutCome = {
            error: true,
            value: "timeout",
        };
        if (!outcomeSent) {
            worker.processCheckOutCome(originalCheckData, checkOutCome);
            outcomeSent = true;
        }
    });
    // req sent
    req.end();
};
worker.processCheckOutCome = (originalCheckData, checkOutCome) => {
    //check if checkoutCome is up or down
    let state =
        !checkOutCome.error &&
            checkOutCome.responseCode &&
            originalCheckData.successCodes.indexOf(checkOutCome.responseCode) > -1
            ? "up"
            : "down";

    //decide whether we should alert the user of not
    let alertWanted =
        !!(originalCheckData.lastChecked && originalCheckData.state !== state)

    //update the check data
    let newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = Date.now();

    //update the check to disk
    data.update("checks", newCheckData.id, newCheckData, (err) => {
        if (!err) {
            if (alertWanted) {
                //send the check data to next process
                worker.alertUserToStatusChange(newCheckData);
            } else {
                console.log("Alert is not needed as there is no state change");
            }
        } else {
            console.log("Error: trying to save check data of one of the checks!");
        }
    });
};

//send notification sms to user if state changes
worker.alertUserToStatusChange = (newCheckData) => {
    const msg = `Alert:  Your check for ${newCheckData.method.toUpperCase()} ${newCheckData.protocol
        }://${newCheckData.url} is currently ${newCheckData.state}`;

    sendTwilioSms(newCheckData.userPhone, msg, (err) => {
        if (!err) {
            console.log(`User was alert to a status change via  SMS ${msg}`);
        } else {
            console.log('there was a problem sending sms to one of the user!');
        }
    })
};

//timer to execute the worker process once per minute
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks();
    }, 8000);
};

//start the worker
worker.init = () => {
    // execute all the checks
    worker.gatherAllChecks();

    // call the loop so that checks continue;
    worker.loop();
};
//export
module.exports = worker;
