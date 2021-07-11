require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(7351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(5278);
const os = __importStar(__nccwpck_require__(2087));
const path = __importStar(__nccwpck_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(5747));
const os = __importStar(__nccwpck_require__(2087));
const utils_1 = __nccwpck_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 6761:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const Utils = __nccwpck_require__(5182);
const pth = __nccwpck_require__(5622);
const ZipEntry = __nccwpck_require__(4057);
const ZipFile = __nccwpck_require__(7744);

const fs = Utils.FileSystem.require();
fs.existsSync = fs.existsSync || pth.existsSync;

const defaultOptions = {
    // read entries during load (initial loading may be slower)
    readEntries: false,
    // default method is none
    method: Utils.Constants.NONE
}

function canonical(p) {
    // trick normalize think path is absolute
    var safeSuffix = pth.posix.normalize("/" + p.split("\\").join("/"));
    return pth.join(".", safeSuffix);
}

module.exports = function (/**String*/input, /** object */options) {
    let inBuffer = null;

    // create object based default options, allowing them to be overwritten
    const opts = Object.assign(Object.create( null ), defaultOptions);

    // test input variable
    if (input && "object" === typeof input){
        // if value is not buffer we accept it to be object with options
        if (!(input instanceof Uint8Array)){
            Object.assign(opts, input);
            input = opts.input ? opts.input : undefined;
            if (opts.input) delete opts.input;
        }

        // if input is buffer
        if (input instanceof Uint8Array){
            inBuffer = input;
            opts.method = Utils.Constants.BUFFER;
            input = undefined;
        }
    }

    // assign options
    Object.assign(opts, options);

    // if input is file name we retrieve its content
    if (input && "string" === typeof input) {
        // load zip file
        if (fs.existsSync(input)) {
            opts.method = Utils.Constants.FILE;
            opts.filename = input;
            inBuffer = fs.readFileSync(input);
        } else {
            throw new Error(Utils.Errors.INVALID_FILENAME);
        }
    }

    // create variable
    const _zip = new ZipFile(inBuffer, opts);

    function sanitize(prefix, name) {
        prefix = pth.resolve(pth.normalize(prefix));
        var parts = name.split('/');
        for (var i = 0, l = parts.length; i < l; i++) {
            var path = pth.normalize(pth.join(prefix, parts.slice(i, l).join(pth.sep)));
            if (path.indexOf(prefix) === 0) {
                return path;
            }
        }
        return pth.normalize(pth.join(prefix, pth.basename(name)));
    }

	function getEntry(/**Object*/entry) {
		if (entry && _zip) {
			var item;
			// If entry was given as a file name
			if (typeof entry === "string")
				item = _zip.getEntry(entry);
			// if entry was given as a ZipEntry object
			if (typeof entry === "object" && typeof entry.entryName !== "undefined" && typeof entry.header !== "undefined")
				item = _zip.getEntry(entry.entryName);

			if (item) {
				return item;
			}
		}
		return null;
	}

    function fixPath(zipPath){
        const { join, normalize, sep } = pth.posix;
        // convert windows file separators and normalize
        return join(".", normalize(sep + zipPath.split("\\").join(sep) + sep));
    }

	return {
		/**
		 * Extracts the given entry from the archive and returns the content as a Buffer object
		 * @param entry ZipEntry object or String with the full path of the entry
		 *
		 * @return Buffer or Null in case of error
		 */
		readFile: function (/**Object*/entry, /*String, Buffer*/pass) {
			var item = getEntry(entry);
			return item && item.getData(pass) || null;
		},

		/**
		 * Asynchronous readFile
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param callback
		 *
		 * @return Buffer or Null in case of error
		 */
		readFileAsync: function (/**Object*/entry, /**Function*/callback) {
			var item = getEntry(entry);
			if (item) {
				item.getDataAsync(callback);
			} else {
				callback(null, "getEntry failed for:" + entry)
			}
		},

		/**
		 * Extracts the given entry from the archive and returns the content as plain text in the given encoding
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param encoding Optional. If no encoding is specified utf8 is used
		 *
		 * @return String
		 */
		readAsText: function (/**Object*/entry, /**String=*/encoding) {
			var item = getEntry(entry);
			if (item) {
				var data = item.getData();
				if (data && data.length) {
					return data.toString(encoding || "utf8");
				}
			}
			return "";
		},

		/**
		 * Asynchronous readAsText
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param callback
		 * @param encoding Optional. If no encoding is specified utf8 is used
		 *
		 * @return String
		 */
		readAsTextAsync: function (/**Object*/entry, /**Function*/callback, /**String=*/encoding) {
			var item = getEntry(entry);
			if (item) {
				item.getDataAsync(function (data, err) {
					if (err) {
						callback(data, err);
						return;
					}

					if (data && data.length) {
						callback(data.toString(encoding || "utf8"));
					} else {
						callback("");
					}
				})
			} else {
				callback("");
			}
		},

		/**
		 * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
		 *
		 * @param entry
		 */
		deleteFile: function (/**Object*/entry) { // @TODO: test deleteFile
			var item = getEntry(entry);
			if (item) {
				_zip.deleteEntry(item.entryName);
			}
		},

		/**
		 * Adds a comment to the zip. The zip must be rewritten after adding the comment.
		 *
		 * @param comment
		 */
		addZipComment: function (/**String*/comment) { // @TODO: test addZipComment
			_zip.comment = comment;
		},

		/**
		 * Returns the zip comment
		 *
		 * @return String
		 */
		getZipComment: function () {
			return _zip.comment || '';
		},

		/**
		 * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
		 * The comment cannot exceed 65535 characters in length
		 *
		 * @param entry
		 * @param comment
		 */
		addZipEntryComment: function (/**Object*/entry, /**String*/comment) {
			var item = getEntry(entry);
			if (item) {
				item.comment = comment;
			}
		},

		/**
		 * Returns the comment of the specified entry
		 *
		 * @param entry
		 * @return String
		 */
		getZipEntryComment: function (/**Object*/entry) {
			var item = getEntry(entry);
			if (item) {
				return item.comment || '';
			}
			return ''
		},

		/**
		 * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
		 *
		 * @param entry
		 * @param content
		 */
		updateFile: function (/**Object*/entry, /**Buffer*/content) {
			var item = getEntry(entry);
			if (item) {
				item.setData(content);
			}
		},

		/**
		 * Adds a file from the disk to the archive
		 *
		 * @param localPath File to add to zip
		 * @param zipPath Optional path inside the zip
		 * @param zipName Optional name for the file
		 */
		addLocalFile: function (/**String*/localPath, /**String=*/zipPath, /**String=*/zipName, /**String*/comment) {
			if (fs.existsSync(localPath)) {
				// fix ZipPath
				zipPath = (zipPath) ? fixPath(zipPath) : "";

				// p - local file name
				var p = localPath.split("\\").join("/").split("/").pop();

				// add file name into zippath
				zipPath += (zipName) ? zipName : p;

				// read file attributes
				const _attr = fs.statSync(localPath);

				// add file into zip file
				this.addFile(zipPath, fs.readFileSync(localPath), comment, _attr)
			} else {
				throw new Error(Utils.Errors.FILE_NOT_FOUND.replace("%s", localPath));
			}
		},

		/**
		 * Adds a local directory and all its nested files and directories to the archive
		 *
		 * @param localPath
		 * @param zipPath optional path inside zip
		 * @param filter optional RegExp or Function if files match will
		 *               be included.
		 */
        addLocalFolder: function (/**String*/localPath, /**String=*/zipPath, /**=RegExp|Function*/filter) {
            // Prepare filter
            if (filter instanceof RegExp) {                 // if filter is RegExp wrap it
                filter = (function (rx){
                    return function (filename) {
                        return rx.test(filename);
                    }
                })(filter);
            } else if ('function' !== typeof filter) {       // if filter is not function we will replace it
                filter = function () {
                    return true;
                };
            }

            // fix ZipPath
            zipPath = (zipPath) ? fixPath(zipPath) : "";

            // normalize the path first
            localPath = pth.normalize(localPath);

            if (fs.existsSync(localPath)) {

                var items = Utils.findFiles(localPath),
                    self = this;

                if (items.length) {
                    items.forEach(function (filepath) {
                        var p = pth.relative(localPath, filepath).split("\\").join("/"); //windows fix
                        if (filter(p)) {
                            var stats = fs.statSync(filepath);
                            if (stats.isFile()) {
                                self.addFile(zipPath + p, fs.readFileSync(filepath), "", stats);
                            } else {
                                self.addFile(zipPath + p + '/', Buffer.alloc(0), "", stats);
                            }
                        }
                    });
                }
            } else {
                throw new Error(Utils.Errors.FILE_NOT_FOUND.replace("%s", localPath));
            }
        },

		/**
		 * Asynchronous addLocalFile
		 * @param localPath
		 * @param callback
		 * @param zipPath optional path inside zip
		 * @param filter optional RegExp or Function if files match will
		 *               be included.
		 */
        addLocalFolderAsync: function (/*String*/localPath, /*Function*/callback, /*String*/zipPath, /*RegExp|Function*/filter) {
            if (filter instanceof RegExp) {
                filter = (function (rx) {
                    return function (filename) {
                        return rx.test(filename);
                    };
                })(filter);
            } else if ("function" !== typeof filter) {
                filter = function () {
                    return true;
                };
            }

            // fix ZipPath
            zipPath = zipPath ? fixPath(zipPath) : "";

            // normalize the path first
            localPath = pth.normalize(localPath);

            var self = this;
            fs.open(localPath, 'r', function (err) {
                if (err && err.code === 'ENOENT') {
                    callback(undefined, Utils.Errors.FILE_NOT_FOUND.replace("%s", localPath));
                } else if (err) {
                    callback(undefined, err);
                } else {
                    var items = Utils.findFiles(localPath);
                    var i = -1;

                    var next = function () {
                        i += 1;
                        if (i < items.length) {
                            var filepath = items[i];
                            var p = pth.relative(localPath, filepath).split("\\").join("/"); //windows fix
                            p = p.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\x20-\x7E]/g, '') // accent fix
                            if (filter(p)) {
                                fs.stat(filepath, function (er0, stats) {
                                    if (er0) callback(undefined, er0);
                                    if (stats.isFile()) {
                                        fs.readFile(filepath, function (er1, data) {
                                            if (er1) {
                                                callback(undefined, er1);
                                            } else {
                                                self.addFile(zipPath + p, data, "", stats);
                                                next();
                                            }
                                        });
                                    } else {
                                        self.addFile(zipPath + p + "/", Buffer.alloc(0), "", stats);
                                        next();
                                    }
                                });
                            } else {
                                next();
                            }

                        } else {
                            callback(true, undefined);
                        }
                    }

                    next();
                }
            });
        },

        addLocalFolderPromise: function (/*String*/ localPath, /* object */ options) {
            return new Promise((resolve, reject) => {
                const { filter, zipPath } = Object.assign({}, options);
                this.addLocalFolderAsync(localPath,
                    (done, err) => {
                        if (err) reject(err);
                        if (done) resolve(this);
                    }, zipPath, filter
                );
            });
        },

        /**
         * Allows you to create a entry (file or directory) in the zip file.
         * If you want to create a directory the entryName must end in / and a null buffer should be provided.
         * Comment and attributes are optional
         *
         * @param {string} entryName
         * @param {Buffer | string} content - file content as buffer or utf8 coded string
         * @param {string} comment - file comment
         * @param {number | object} attr - number as unix file permissions, object as filesystem Stats object
         */
        addFile: function (/**String*/ entryName, /**Buffer*/ content, /**String*/ comment, /**Number*/ attr) {
            let entry = getEntry(entryName);
            const update = entry != null;

            // prepare new entry
            if (!update){
                entry = new ZipEntry();
                entry.entryName = entryName;
            }
            entry.comment = comment || "";

            const isStat = ('object' === typeof attr) && (attr instanceof fs.Stats);

            // last modification time from file stats
            if (isStat){
                entry.header.time = attr.mtime;
            }

            // Set file attribute
            var fileattr = (entry.isDirectory) ? 0x10 : 0;  // (MS-DOS directory flag)

            // extended attributes field for Unix
            if('win32' !== process.platform){
                // set file type either S_IFDIR / S_IFREG
                let unix = (entry.isDirectory) ? 0x4000 : 0x8000;

                if (isStat) {                                       // File attributes from file stats
                    unix |= (0xfff & attr.mode);
                }else if ('number' === typeof attr){                // attr from given attr values
                    unix |= (0xfff & attr);
                }else{                                              // Default values:
                    unix |= (entry.isDirectory) ? 0o755 : 0o644;    // permissions (drwxr-xr-x) or (-r-wr--r--)
                }

                fileattr = (fileattr | (unix << 16)) >>> 0;         // add attributes
            }

            entry.attr = fileattr;

            entry.setData(content);
            if (!update) _zip.setEntry(entry);
        },

		/**
		 * Returns an array of ZipEntry objects representing the files and folders inside the archive
		 *
		 * @return Array
		 */
		getEntries: function () {
			if (_zip) {
				return _zip.entries;
			} else {
				return [];
			}
		},

		/**
		 * Returns a ZipEntry object representing the file or folder specified by ``name``.
		 *
		 * @param name
		 * @return ZipEntry
		 */
		getEntry: function (/**String*/name) {
			return getEntry(name);
		},

		getEntryCount: function() {
			return _zip.getEntryCount();
		},

		forEach: function(callback) {
			return _zip.forEach(callback);
		},

		/**
		 * Extracts the given entry to the given targetPath
		 * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
		 *
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param targetPath Target folder where to write the file
		 * @param maintainEntryPath If maintainEntryPath is true and the entry is inside a folder, the entry folder
		 *                          will be created in targetPath as well. Default is TRUE
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
         * @param outFileName String If set will override the filename of the extracted file (Only works if the entry is a file)
		 *
		 * @return Boolean
		 */
		extractEntryTo: function (/**Object*/entry, /**String*/targetPath, /**Boolean*/maintainEntryPath, /**Boolean*/overwrite, /**String**/outFileName) {
			overwrite = overwrite || false;
			maintainEntryPath = typeof maintainEntryPath === "undefined" ? true : maintainEntryPath;

			var item = getEntry(entry);
			if (!item) {
				throw new Error(Utils.Errors.NO_ENTRY);
			}

			var entryName = canonical(item.entryName);

			var target = sanitize(targetPath,outFileName && !item.isDirectory ? outFileName : (maintainEntryPath ? entryName : pth.basename(entryName)));

			if (item.isDirectory) {
				target = pth.resolve(target, "..");
				var children = _zip.getEntryChildren(item);
				children.forEach(function (child) {
					if (child.isDirectory) return;
					var content = child.getData();
					if (!content) {
						throw new Error(Utils.Errors.CANT_EXTRACT_FILE);
					}
					var name = canonical(child.entryName)
					var childName = sanitize(targetPath, maintainEntryPath ? name : pth.basename(name));
					// The reverse operation for attr depend on method addFile()
					var fileAttr = child.attr ? (((child.attr >>> 0) | 0) >> 16) & 0xfff : 0;
					Utils.writeFileTo(childName, content, overwrite, fileAttr);
				});
				return true;
			}

			var content = item.getData();
			if (!content) throw new Error(Utils.Errors.CANT_EXTRACT_FILE);

			if (fs.existsSync(target) && !overwrite) {
				throw new Error(Utils.Errors.CANT_OVERRIDE);
			}
			// The reverse operation for attr depend on method addFile()
			var fileAttr = item.attr ? (((item.attr >>> 0) | 0) >> 16) & 0xfff : 0;
			Utils.writeFileTo(target, content, overwrite, fileAttr);

			return true;
		},

		/**
		 * Test the archive
		 *
		 */
		test: function (pass) {
			if (!_zip) {
				return false;
			}

			for (var entry in _zip.entries) {
				try {
					if (entry.isDirectory) {
						continue;
					}
					var content = _zip.entries[entry].getData(pass);
					if (!content) {
						return false;
					}
				} catch (err) {
					return false;
				}
			}
			return true;
		},

		/**
		 * Extracts the entire archive to the given location
		 *
		 * @param targetPath Target location
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
		 */
		extractAllTo: function (/**String*/targetPath, /**Boolean*/overwrite, /*String, Buffer*/pass) {
			overwrite = overwrite || false;
			if (!_zip) {
				throw new Error(Utils.Errors.NO_ZIP);
			}
			_zip.entries.forEach(function (entry) {
				var entryName = sanitize(targetPath, canonical(entry.entryName.toString()));
				if (entry.isDirectory) {
					Utils.makeDir(entryName);
					return;
				}
				var content = entry.getData(pass);
				if (!content) {
					throw new Error(Utils.Errors.CANT_EXTRACT_FILE);
				}
				// The reverse operation for attr depend on method addFile()
				var fileAttr = entry.attr ? (((entry.attr >>> 0) | 0) >> 16) & 0xfff : 0;
				Utils.writeFileTo(entryName, content, overwrite, fileAttr);
				try {
					fs.utimesSync(entryName, entry.header.time, entry.header.time)
				} catch (err) {
					throw new Error(Utils.Errors.CANT_EXTRACT_FILE);
				}
			})
		},

		/**
		 * Asynchronous extractAllTo
		 *
		 * @param targetPath Target location
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
		 * @param callback
		 */
		extractAllToAsync: function (/**String*/targetPath, /**Boolean*/overwrite, /**Function*/callback) {
			if (!callback) {
				callback = function() {}
			}
			overwrite = overwrite || false;
			if (!_zip) {
				callback(new Error(Utils.Errors.NO_ZIP));
				return;
			}

			var entries = _zip.entries;
			var i = entries.length;
			entries.forEach(function (entry) {
				if (i <= 0) return; // Had an error already

				var entryName = pth.normalize(canonical(entry.entryName.toString()));

				if (entry.isDirectory) {
					Utils.makeDir(sanitize(targetPath, entryName));
					if (--i === 0)
						callback(undefined);
					return;
				}
				entry.getDataAsync(function (content, err) {
					if (i <= 0) return;
					if (err) {
						callback(new Error(err));
						return;
					}
					if (!content) {
						i = 0;
						callback(new Error(Utils.Errors.CANT_EXTRACT_FILE));
						return;
					}

					// The reverse operation for attr depend on method addFile()
					var fileAttr = entry.attr ? (((entry.attr >>> 0) | 0) >> 16) & 0xfff : 0;
					Utils.writeFileToAsync(sanitize(targetPath, entryName), content, overwrite, fileAttr, function (succ) {
						try {
							fs.utimesSync(pth.resolve(targetPath, entryName), entry.header.time, entry.header.time);
						} catch (err) {
							callback(new Error('Unable to set utimes'));
						}
						if (i <= 0) return;
						if (!succ) {
							i = 0;
							callback(new Error('Unable to write'));
							return;
						}
						if (--i === 0)
							callback(undefined);
					});
				});
			})
		},

		/**
		 * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
		 *
		 * @param targetFileName
		 * @param callback
		 */
		writeZip: function (/**String*/targetFileName, /**Function*/callback) {
			if (arguments.length === 1) {
				if (typeof targetFileName === "function") {
					callback = targetFileName;
					targetFileName = "";
				}
			}

			if (!targetFileName && opts.filename) {
				targetFileName = opts.filename;
			}
			if (!targetFileName) return;

			var zipData = _zip.compressToBuffer();
			if (zipData) {
				var ok = Utils.writeFileTo(targetFileName, zipData, true);
				if (typeof callback === 'function') callback(!ok ? new Error("failed") : null, "");
			}
		},

        writeZipPromise: function (/**String*/ targetFileName, /* object */ options) {
            const { overwrite, perm } = Object.assign({ overwrite: true }, options);

            return new Promise((resolve, reject) => {
                // find file name
                if (!targetFileName && opts.filename) targetFileName = opts.filename;
                if (!targetFileName) reject("ADM-ZIP: ZIP File Name Missing");

                this.toBufferPromise().then((zipData) => {
                    const ret = (done) => (done ? resolve(done) : reject("ADM-ZIP: Wasn't able to write zip file"));
                    Utils.writeFileToAsync(targetFileName, zipData, overwrite, perm, ret);
                }, reject);
            });
        },

        toBufferPromise: function () {
            return new Promise((resolve, reject) => {
                _zip.toAsyncBuffer(resolve, reject);
            });
        },

		/**
		 * Returns the content of the entire zip file as a Buffer object
		 *
		 * @return Buffer
		 */
		toBuffer: function (/**Function=*/onSuccess, /**Function=*/onFail, /**Function=*/onItemStart, /**Function=*/onItemEnd) {
			this.valueOf = 2;
			if (typeof onSuccess === "function") {
				_zip.toAsyncBuffer(onSuccess, onFail, onItemStart, onItemEnd);
				return null;
			}
			return _zip.compressToBuffer()
		}
	}
};


/***/ }),

/***/ 9032:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Utils = __nccwpck_require__(5182),
    Constants = Utils.Constants;

/* The central directory file header */
module.exports = function () {
    var _verMade = 0x14,
        _version = 0x0A,
        _flags = 0,
        _method = 0,
        _time = 0,
        _crc = 0,
        _compressedSize = 0,
        _size = 0,
        _fnameLen = 0,
        _extraLen = 0,

        _comLen = 0,
        _diskStart = 0,
        _inattr = 0,
        _attr = 0,
        _offset = 0;

    switch(process.platform){
        case 'win32':
            _verMade |= 0x0A00;
        default:
            _verMade |= 0x0300;
    }

    var _dataHeader = {};

    function setTime(val) {
        val = new Date(val);
        _time = (val.getFullYear() - 1980 & 0x7f) << 25  // b09-16 years from 1980
            | (val.getMonth() + 1) << 21                 // b05-08 month
            | val.getDate() << 16                        // b00-04 hour

            // 2 bytes time
            | val.getHours() << 11    // b11-15 hour
            | val.getMinutes() << 5   // b05-10 minute
            | val.getSeconds() >> 1;  // b00-04 seconds divided by 2
    }

    setTime(+new Date());

    return {
        get made () { return _verMade; },
        set made (val) { _verMade = val; },

        get version () { return _version; },
        set version (val) { _version = val },

        get flags () { return _flags },
        set flags (val) { _flags = val; },

        get method () { return _method; },
        set method (val) {
            switch (val){
                case Constants.STORED:
                    this.version = 10;
                case Constants.DEFLATED:
                default:
                    this.version = 20;
            }
            _method = val;
            },

        get time () { return new Date(
            ((_time >> 25) & 0x7f) + 1980,
            ((_time >> 21) & 0x0f) - 1,
            (_time >> 16) & 0x1f,
            (_time >> 11) & 0x1f,
            (_time >> 5) & 0x3f,
            (_time & 0x1f) << 1
        );
        },
        set time (val) {
            setTime(val);
        },

        get crc () { return _crc; },
        set crc (val) { _crc = val; },

        get compressedSize () { return _compressedSize; },
        set compressedSize (val) { _compressedSize = val; },

        get size () { return _size; },
        set size (val) { _size = val; },

        get fileNameLength () { return _fnameLen; },
        set fileNameLength (val) { _fnameLen = val; },

        get extraLength () { return _extraLen },
        set extraLength (val) { _extraLen = val; },

        get commentLength () { return _comLen },
        set commentLength (val) { _comLen = val },

        get diskNumStart () { return _diskStart },
        set diskNumStart (val) { _diskStart = val },

        get inAttr () { return _inattr },
        set inAttr (val) { _inattr = val },

        get attr () { return _attr },
        set attr (val) { _attr = val },

        get offset () { return _offset },
        set offset (val) { _offset = val },

        get encripted () { return (_flags & 1) === 1 },

        get entryHeaderSize () {
            return Constants.CENHDR + _fnameLen + _extraLen + _comLen;
        },

        get realDataOffset () {
            return _offset + Constants.LOCHDR + _dataHeader.fnameLen + _dataHeader.extraLen;
        },

        get dataHeader () {
            return _dataHeader;
        },

        loadDataHeaderFromBinary : function(/*Buffer*/input) {
            var data = input.slice(_offset, _offset + Constants.LOCHDR);
            // 30 bytes and should start with "PK\003\004"
            if (data.readUInt32LE(0) !== Constants.LOCSIG) {
                throw new Error(Utils.Errors.INVALID_LOC);
            }
            _dataHeader = {
                // version needed to extract
                version : data.readUInt16LE(Constants.LOCVER),
                // general purpose bit flag
                flags : data.readUInt16LE(Constants.LOCFLG),
                // compression method
                method : data.readUInt16LE(Constants.LOCHOW),
                // modification time (2 bytes time, 2 bytes date)
                time : data.readUInt32LE(Constants.LOCTIM),
                // uncompressed file crc-32 value
                crc : data.readUInt32LE(Constants.LOCCRC),
                // compressed size
                compressedSize : data.readUInt32LE(Constants.LOCSIZ),
                // uncompressed size
                size : data.readUInt32LE(Constants.LOCLEN),
                // filename length
                fnameLen : data.readUInt16LE(Constants.LOCNAM),
                // extra field length
                extraLen : data.readUInt16LE(Constants.LOCEXT)
            }
        },

        loadFromBinary : function(/*Buffer*/data) {
            // data should be 46 bytes and start with "PK 01 02"
            if (data.length !== Constants.CENHDR || data.readUInt32LE(0) !== Constants.CENSIG) {
                throw new Error(Utils.Errors.INVALID_CEN);
            }
            // version made by
            _verMade = data.readUInt16LE(Constants.CENVEM);
            // version needed to extract
            _version = data.readUInt16LE(Constants.CENVER);
            // encrypt, decrypt flags
            _flags = data.readUInt16LE(Constants.CENFLG);
            // compression method
            _method = data.readUInt16LE(Constants.CENHOW);
            // modification time (2 bytes time, 2 bytes date)
            _time = data.readUInt32LE(Constants.CENTIM);
            // uncompressed file crc-32 value
            _crc = data.readUInt32LE(Constants.CENCRC);
            // compressed size
            _compressedSize = data.readUInt32LE(Constants.CENSIZ);
            // uncompressed size
            _size = data.readUInt32LE(Constants.CENLEN);
            // filename length
            _fnameLen = data.readUInt16LE(Constants.CENNAM);
            // extra field length
            _extraLen = data.readUInt16LE(Constants.CENEXT);
            // file comment length
            _comLen = data.readUInt16LE(Constants.CENCOM);
            // volume number start
            _diskStart = data.readUInt16LE(Constants.CENDSK);
            // internal file attributes
            _inattr = data.readUInt16LE(Constants.CENATT);
            // external file attributes
            _attr = data.readUInt32LE(Constants.CENATX);
            // LOC header offset
            _offset = data.readUInt32LE(Constants.CENOFF);
        },

        dataHeaderToBinary : function() {
            // LOC header size (30 bytes)
            var data = Buffer.alloc(Constants.LOCHDR);
            // "PK\003\004"
            data.writeUInt32LE(Constants.LOCSIG, 0);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.LOCVER);
            // general purpose bit flag
            data.writeUInt16LE(_flags, Constants.LOCFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.LOCHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.LOCTIM);
            // uncompressed file crc-32 value
            data.writeUInt32LE(_crc, Constants.LOCCRC);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.LOCSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.LOCLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.LOCNAM);
            // extra field length
            data.writeUInt16LE(_extraLen, Constants.LOCEXT);
            return data;
        },

        entryHeaderToBinary : function() {
            // CEN header size (46 bytes)
            var data = Buffer.alloc(Constants.CENHDR + _fnameLen + _extraLen + _comLen);
            // "PK\001\002"
            data.writeUInt32LE(Constants.CENSIG, 0);
            // version made by
            data.writeUInt16LE(_verMade, Constants.CENVEM);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.CENVER);
            // encrypt, decrypt flags
            data.writeUInt16LE(_flags, Constants.CENFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.CENHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.CENTIM);
            // uncompressed file crc-32 value
            data.writeUInt32LE(_crc, Constants.CENCRC);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.CENSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.CENLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.CENNAM);
            // extra field length
            data.writeUInt16LE(_extraLen, Constants.CENEXT);
            // file comment length
            data.writeUInt16LE(_comLen, Constants.CENCOM);
            // volume number start
            data.writeUInt16LE(_diskStart, Constants.CENDSK);
            // internal file attributes
            data.writeUInt16LE(_inattr, Constants.CENATT);
            // external file attributes
            data.writeUInt32LE(_attr, Constants.CENATX);
            // LOC header offset
            data.writeUInt32LE(_offset, Constants.CENOFF);
            // fill all with
            data.fill(0x00, Constants.CENHDR);
            return data;
        },

        toString : function() {
            return '{\n' +
                '\t"made" : ' + _verMade + ",\n" +
                '\t"version" : ' + _version + ",\n" +
                '\t"flags" : ' + _flags + ",\n" +
                '\t"method" : ' + Utils.methodToString(_method) + ",\n" +
                '\t"time" : ' + this.time + ",\n" +
                '\t"crc" : 0x' + _crc.toString(16).toUpperCase() + ",\n" +
                '\t"compressedSize" : ' + _compressedSize + " bytes,\n" +
                '\t"size" : ' + _size + " bytes,\n" +
                '\t"fileNameLength" : ' + _fnameLen + ",\n" +
                '\t"extraLength" : ' + _extraLen + " bytes,\n" +
                '\t"commentLength" : ' + _comLen + " bytes,\n" +
                '\t"diskNumStart" : ' + _diskStart + ",\n" +
                '\t"inAttr" : ' + _inattr + ",\n" +
                '\t"attr" : ' + _attr + ",\n" +
                '\t"offset" : ' + _offset + ",\n" +
                '\t"entryHeaderSize" : ' + (Constants.CENHDR + _fnameLen + _extraLen + _comLen) + " bytes\n" +
                '}';
        }
    }
};


/***/ }),

/***/ 4958:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

exports.EntryHeader = __nccwpck_require__(9032);
exports.MainHeader = __nccwpck_require__(4408);


/***/ }),

/***/ 4408:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Utils = __nccwpck_require__(5182),
    Constants = Utils.Constants;

/* The entries in the end of central directory */
module.exports = function () {
    var _volumeEntries = 0,
        _totalEntries = 0,
        _size = 0,
        _offset = 0,
        _commentLength = 0;

    return {
        get diskEntries () { return _volumeEntries },
        set diskEntries (/*Number*/val) { _volumeEntries = _totalEntries = val; },

        get totalEntries () { return _totalEntries },
        set totalEntries (/*Number*/val) { _totalEntries = _volumeEntries = val; },

        get size () { return _size },
        set size (/*Number*/val) { _size = val; },

        get offset () { return _offset },
        set offset (/*Number*/val) { _offset = val; },

        get commentLength () { return _commentLength },
        set commentLength (/*Number*/val) { _commentLength = val; },

        get mainHeaderSize () {
            return Constants.ENDHDR + _commentLength;
        },

        loadFromBinary : function(/*Buffer*/data) {
            // data should be 22 bytes and start with "PK 05 06"
            // or be 56+ bytes and start with "PK 06 06" for Zip64
            if ((data.length !== Constants.ENDHDR || data.readUInt32LE(0) !== Constants.ENDSIG) &&
                (data.length < Constants.ZIP64HDR || data.readUInt32LE(0) !== Constants.ZIP64SIG)) {

                throw new Error(Utils.Errors.INVALID_END);
            }

            if (data.readUInt32LE(0) === Constants.ENDSIG) {
                // number of entries on this volume
                _volumeEntries = data.readUInt16LE(Constants.ENDSUB);
                // total number of entries
                _totalEntries = data.readUInt16LE(Constants.ENDTOT);
                // central directory size in bytes
                _size = data.readUInt32LE(Constants.ENDSIZ);
                // offset of first CEN header
                _offset = data.readUInt32LE(Constants.ENDOFF);
                // zip file comment length
                _commentLength = data.readUInt16LE(Constants.ENDCOM);
            } else {
                // number of entries on this volume
                _volumeEntries = Utils.readBigUInt64LE(data, Constants.ZIP64SUB);
                // total number of entries
                _totalEntries = Utils.readBigUInt64LE(data, Constants.ZIP64TOT);
                // central directory size in bytes
                _size = Utils.readBigUInt64LE(data, Constants.ZIP64SIZ);
                // offset of first CEN header
                _offset = Utils.readBigUInt64LE(data, Constants.ZIP64OFF);

                _commentLength = 0;
            }

        },

        toBinary : function() {
           var b = Buffer.alloc(Constants.ENDHDR + _commentLength);
            // "PK 05 06" signature
            b.writeUInt32LE(Constants.ENDSIG, 0);
            b.writeUInt32LE(0, 4);
            // number of entries on this volume
            b.writeUInt16LE(_volumeEntries, Constants.ENDSUB);
            // total number of entries
            b.writeUInt16LE(_totalEntries, Constants.ENDTOT);
            // central directory size in bytes
            b.writeUInt32LE(_size, Constants.ENDSIZ);
            // offset of first CEN header
            b.writeUInt32LE(_offset, Constants.ENDOFF);
            // zip file comment length
            b.writeUInt16LE(_commentLength, Constants.ENDCOM);
            // fill comment memory with spaces so no garbage is left there
            b.fill(" ", Constants.ENDHDR);

            return b;
        },

        toString : function() {
            return '{\n' +
                '\t"diskEntries" : ' + _volumeEntries + ",\n" +
                '\t"totalEntries" : ' + _totalEntries + ",\n" +
                '\t"size" : ' + _size + " bytes,\n" +
                '\t"offset" : 0x' + _offset.toString(16).toUpperCase() + ",\n" +
                '\t"commentLength" : 0x' + _commentLength + "\n" +
            '}';
        }
    }
};

/***/ }),

/***/ 7686:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = function (/*Buffer*/inbuf) {

  var zlib = __nccwpck_require__(8761);
  
  var opts = {chunkSize: (parseInt(inbuf.length / 1024) + 1) * 1024};
  
  return {
    deflate: function () {
      return zlib.deflateRawSync(inbuf, opts);
    },

    deflateAsync: function (/*Function*/callback) {
      var tmp = zlib.createDeflateRaw(opts), parts = [], total = 0;
      tmp.on('data', function (data) {
        parts.push(data);
        total += data.length;
      });
      tmp.on('end', function () {
        var buf = Buffer.alloc(total), written = 0;
        buf.fill(0);
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          part.copy(buf, written);
          written += part.length;
        }
        callback && callback(buf);
      });
      tmp.end(inbuf);
    }
  }
};


/***/ }),

/***/ 3928:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

exports.Deflater = __nccwpck_require__(7686);
exports.Inflater = __nccwpck_require__(2153);
exports.ZipCrypto = __nccwpck_require__(3228);

/***/ }),

/***/ 2153:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = function (/*Buffer*/inbuf) {

  var zlib = __nccwpck_require__(8761);

  return {
    inflate: function () {
      return zlib.inflateRawSync(inbuf);
    },

    inflateAsync: function (/*Function*/callback) {
      var tmp = zlib.createInflateRaw(), parts = [], total = 0;
      tmp.on('data', function (data) {
        parts.push(data);
        total += data.length;
      });
      tmp.on('end', function () {
        var buf = Buffer.alloc(total), written = 0;
        buf.fill(0);
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          part.copy(buf, written);
          written += part.length;
        }
        callback && callback(buf);
      });
      tmp.end(inbuf);
    }
  }
};


/***/ }),

/***/ 3228:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// node crypt, we use it for generate salt
const { randomFillSync } = __nccwpck_require__(6417);

"use strict";

// generate CRC32 lookup table
const crctable = new Uint32Array(256).map((t, crc) => {
    for (let j = 0; j < 8; j++) {
        if (0 !== (crc & 1)) {
            crc = (crc >>> 1) ^ 0xedb88320;
        } else {
            crc >>>= 1;
        }
    }
    return crc >>> 0;
});

// C-style uInt32 Multiply (discards higher bits, when JS multiply discards lower bits)
const uMul = (a, b) => Math.imul(a, b) >>> 0;

// crc32 byte single update (actually same function is part of utils.crc32 function :) )
const crc32update = (pCrc32, bval) => {
    return crctable[(pCrc32 ^ bval) & 0xff] ^ (pCrc32 >>> 8);
};

// function for generating salt for encrytion header
const genSalt = () => {
    if ("function" === typeof randomFillSync) {
        return randomFillSync(Buffer.alloc(12));
    } else {
        // fallback if function is not defined
        return genSalt.node();
    }
};

// salt generation with node random function (mainly as fallback)
genSalt.node = () => {
    const salt = Buffer.alloc(12);
    const len = salt.length;
    for (let i = 0; i < len; i++) salt[i] = (Math.random() * 256) & 0xff;
    return salt;
};

// general config
const config = {
    genSalt
};

// Class Initkeys handles same basic ops with keys
function Initkeys(pw) {
    const pass = Buffer.isBuffer(pw) ? pw : Buffer.from(pw);
    this.keys = new Uint32Array([0x12345678, 0x23456789, 0x34567890]);
    for (let i = 0; i < pass.length; i++) {
        this.updateKeys(pass[i]);
    }
}

Initkeys.prototype.updateKeys = function (byteValue) {
    const keys = this.keys;
    keys[0] = crc32update(keys[0], byteValue);
    keys[1] += keys[0] & 0xff;
    keys[1] = uMul(keys[1], 134775813) + 1;
    keys[2] = crc32update(keys[2], keys[1] >>> 24);
    return byteValue;
};

Initkeys.prototype.next = function () {
    const k = (this.keys[2] | 2) >>> 0; // key
    return (uMul(k, k ^ 1) >> 8) & 0xff; // decode
};

function make_decrypter(/*Buffer*/ pwd) {
    // 1. Stage initialize key
    const keys = new Initkeys(pwd);

    // return decrypter function
    return function (/*Buffer*/ data) {
        // result - we create new Buffer for results
        const result = Buffer.alloc(data.length);
        let pos = 0;
        // process input data
        for (let c of data) {
            //c ^= keys.next();
            //result[pos++] = c; // decode & Save Value
            result[pos++] = keys.updateKeys(c ^ keys.next()); // update keys with decoded byte
        }
        return result;
    };
}

function make_encrypter(/*Buffer*/ pwd) {
    // 1. Stage initialize key
    const keys = new Initkeys(pwd);

    // return encrypting function, result and pos is here so we dont have to merge buffers later
    return function (/*Buffer*/ data, /*Buffer*/ result, /* Number */ pos = 0) {
        // result - we create new Buffer for results
        if (!result) result = Buffer.alloc(data.length);
        // process input data
        for (let c of data) {
            const k = keys.next(); // save key byte
            result[pos++] = c ^ k; // save val
            keys.updateKeys(c); // update keys with decoded byte
        }
        return result;
    };
}

function decrypt(/*Buffer*/ data, /*Object*/ header, /*String, Buffer*/ pwd) {
    if (!data || !Buffer.isBuffer(data) || data.length < 12) {
        return Buffer.alloc(0);
    }

    // 1. We Initialize and generate decrypting function
    const decrypter = make_decrypter(pwd);

    // 2. decrypt salt what is always 12 bytes and is a part of file content
    const salt = decrypter(data.slice(0, 12));

    // 3. does password meet expectations
    if (salt[11] !== header.crc >>> 24) {
        throw "ADM-ZIP: Wrong Password";
    }

    // 4. decode content
    return decrypter(data.slice(12));
}

// lets add way to populate salt, NOT RECOMMENDED for production but maybe useful for testing general functionality
function _salter(data) {
    if (Buffer.isBuffer(data) && data.length >= 12) {
        // be aware - currently salting buffer data is modified
        config.genSalt = function () {
            return data.slice(0, 12);
        };
    } else if (data === "node") {
        // test salt generation with node random function
        config.genSalt = genSalt.node;
    } else {
        // if value is not acceptable config gets reset.
        config.genSalt = genSalt;
    }
}

function encrypt(/*Buffer*/ data, /*Object*/ header, /*String, Buffer*/ pwd, /*Boolean*/ oldlike = false) {
    // 1. test data if data is not Buffer we make buffer from it
    if (data == null) data = Buffer.alloc(0);
    // if data is not buffer be make buffer from it
    if (!Buffer.isBuffer(data)) data = Buffer.from(data.toString());

    // 2. We Initialize and generate encrypting function
    const encrypter = make_encrypter(pwd);

    // 3. generate salt (12-bytes of random data)
    const salt = config.genSalt();
    salt[11] = (header.crc >>> 24) & 0xff;

    // old implementations (before PKZip 2.04g) used two byte check
    if (oldlike) salt[10] = (header.crc >>> 16) & 0xff;

    // 4. create output
    const result = Buffer.alloc(data.length + 12);
    encrypter(salt, result);

    // finally encode content
    return encrypter(data, result, 12);
}

module.exports = { decrypt, encrypt, _salter };


/***/ }),

/***/ 4522:
/***/ ((module) => {

module.exports = {
    /* The local file header */
    LOCHDR           : 30, // LOC header size
    LOCSIG           : 0x04034b50, // "PK\003\004"
    LOCVER           : 4,	// version needed to extract
    LOCFLG           : 6, // general purpose bit flag
    LOCHOW           : 8, // compression method
    LOCTIM           : 10, // modification time (2 bytes time, 2 bytes date)
    LOCCRC           : 14, // uncompressed file crc-32 value
    LOCSIZ           : 18, // compressed size
    LOCLEN           : 22, // uncompressed size
    LOCNAM           : 26, // filename length
    LOCEXT           : 28, // extra field length

    /* The Data descriptor */
    EXTSIG           : 0x08074b50, // "PK\007\008"
    EXTHDR           : 16, // EXT header size
    EXTCRC           : 4, // uncompressed file crc-32 value
    EXTSIZ           : 8, // compressed size
    EXTLEN           : 12, // uncompressed size

    /* The central directory file header */
    CENHDR           : 46, // CEN header size
    CENSIG           : 0x02014b50, // "PK\001\002"
    CENVEM           : 4, // version made by
    CENVER           : 6, // version needed to extract
    CENFLG           : 8, // encrypt, decrypt flags
    CENHOW           : 10, // compression method
    CENTIM           : 12, // modification time (2 bytes time, 2 bytes date)
    CENCRC           : 16, // uncompressed file crc-32 value
    CENSIZ           : 20, // compressed size
    CENLEN           : 24, // uncompressed size
    CENNAM           : 28, // filename length
    CENEXT           : 30, // extra field length
    CENCOM           : 32, // file comment length
    CENDSK           : 34, // volume number start
    CENATT           : 36, // internal file attributes
    CENATX           : 38, // external file attributes (host system dependent)
    CENOFF           : 42, // LOC header offset

    /* The entries in the end of central directory */
    ENDHDR           : 22, // END header size
    ENDSIG           : 0x06054b50, // "PK\005\006"
    ENDSUB           : 8, // number of entries on this disk
    ENDTOT           : 10, // total number of entries
    ENDSIZ           : 12, // central directory size in bytes
    ENDOFF           : 16, // offset of first CEN header
    ENDCOM           : 20, // zip file comment length

    END64HDR         : 20, // zip64 END header size
    END64SIG         : 0x07064b50, // zip64 Locator signature, "PK\006\007"
    END64START       : 4, // number of the disk with the start of the zip64
    END64OFF         : 8, // relative offset of the zip64 end of central directory
    END64NUMDISKS    : 16, // total number of disks

    ZIP64SIG         : 0x06064b50, // zip64 signature, "PK\006\006"
    ZIP64HDR         : 56, // zip64 record minimum size
    ZIP64LEAD        : 12, // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
    ZIP64SIZE        : 4, // zip64 size of the central directory record
    ZIP64VEM         : 12, // zip64 version made by
    ZIP64VER         : 14, // zip64 version needed to extract
    ZIP64DSK         : 16, // zip64 number of this disk
    ZIP64DSKDIR      : 20, // number of the disk with the start of the record directory
    ZIP64SUB         : 24, // number of entries on this disk
    ZIP64TOT         : 32, // total number of entries
    ZIP64SIZB        : 40, // zip64 central directory size in bytes
    ZIP64OFF         : 48, // offset of start of central directory with respect to the starting disk number
    ZIP64EXTRA       : 56, // extensible data sector

    /* Compression methods */
    STORED           : 0, // no compression
    SHRUNK           : 1, // shrunk
    REDUCED1         : 2, // reduced with compression factor 1
    REDUCED2         : 3, // reduced with compression factor 2
    REDUCED3         : 4, // reduced with compression factor 3
    REDUCED4         : 5, // reduced with compression factor 4
    IMPLODED         : 6, // imploded
    // 7 reserved
    DEFLATED         : 8, // deflated
    ENHANCED_DEFLATED: 9, // enhanced deflated
    PKWARE           : 10,// PKWare DCL imploded
    // 11 reserved
    BZIP2            : 12, //  compressed using BZIP2
    // 13 reserved
    LZMA             : 14, // LZMA
    // 15-17 reserved
    IBM_TERSE        : 18, // compressed using IBM TERSE
    IBM_LZ77         : 19, //IBM LZ77 z

    /* General purpose bit flag */
    FLG_ENC          : 0,  // encripted file
    FLG_COMP1        : 1,  // compression option
    FLG_COMP2        : 2,  // compression option
    FLG_DESC         : 4,  // data descriptor
    FLG_ENH          : 8,  // enhanced deflation
    FLG_STR          : 16, // strong encryption
    FLG_LNG          : 1024, // language encoding
    FLG_MSK          : 4096, // mask header values

    /* Load type */
    FILE             : 2,
    BUFFER           : 1,
    NONE             : 0,

    /* 4.5 Extensible data fields */
    EF_ID            : 0,
    EF_SIZE          : 2,

    /* Header IDs */
    ID_ZIP64         : 0x0001,
    ID_AVINFO        : 0x0007,
    ID_PFS           : 0x0008,
    ID_OS2           : 0x0009,
    ID_NTFS          : 0x000a,
    ID_OPENVMS       : 0x000c,
    ID_UNIX          : 0x000d,
    ID_FORK          : 0x000e,
    ID_PATCH         : 0x000f,
    ID_X509_PKCS7    : 0x0014,
    ID_X509_CERTID_F : 0x0015,
    ID_X509_CERTID_C : 0x0016,
    ID_STRONGENC     : 0x0017,
    ID_RECORD_MGT    : 0x0018,
    ID_X509_PKCS7_RL : 0x0019,
    ID_IBM1          : 0x0065,
    ID_IBM2          : 0x0066,
    ID_POSZIP        : 0x4690,

    EF_ZIP64_OR_32   : 0xffffffff,
    EF_ZIP64_OR_16   : 0xffff,
    EF_ZIP64_SUNCOMP : 0,
    EF_ZIP64_SCOMP   : 8,
    EF_ZIP64_RHO     : 16,
    EF_ZIP64_DSN     : 24
};


/***/ }),

/***/ 1255:
/***/ ((module) => {

module.exports = {
    /* Header error messages */
    "INVALID_LOC" : "Invalid LOC header (bad signature)",
    "INVALID_CEN" : "Invalid CEN header (bad signature)",
    "INVALID_END" : "Invalid END header (bad signature)",

    /* ZipEntry error messages*/
    "NO_DATA" : "Nothing to decompress",
    "BAD_CRC" : "CRC32 checksum failed",
    "FILE_IN_THE_WAY" : "There is a file in the way: %s",
    "UNKNOWN_METHOD" : "Invalid/unsupported compression method",

    /* Inflater error messages */
    "AVAIL_DATA" : "inflate::Available inflate data did not terminate",
    "INVALID_DISTANCE" : "inflate::Invalid literal/length or distance code in fixed or dynamic block",
    "TO_MANY_CODES" : "inflate::Dynamic block code description: too many length or distance codes",
    "INVALID_REPEAT_LEN" : "inflate::Dynamic block code description: repeat more than specified lengths",
    "INVALID_REPEAT_FIRST" : "inflate::Dynamic block code description: repeat lengths with no first length",
    "INCOMPLETE_CODES" : "inflate::Dynamic block code description: code lengths codes incomplete",
    "INVALID_DYN_DISTANCE": "inflate::Dynamic block code description: invalid distance code lengths",
    "INVALID_CODES_LEN": "inflate::Dynamic block code description: invalid literal/length code lengths",
    "INVALID_STORE_BLOCK" : "inflate::Stored block length did not match one's complement",
    "INVALID_BLOCK_TYPE" : "inflate::Invalid block type (type == 3)",

    /* ADM-ZIP error messages */
    "CANT_EXTRACT_FILE" : "Could not extract the file",
    "CANT_OVERRIDE" : "Target file already exists",
    "NO_ZIP" : "No zip file was loaded",
    "NO_ENTRY" : "Entry doesn't exist",
    "DIRECTORY_CONTENT_ERROR" : "A directory cannot have content",
    "FILE_NOT_FOUND" : "File not found: %s",
    "NOT_IMPLEMENTED" : "Not implemented",
    "INVALID_FILENAME" : "Invalid filename",
    "INVALID_FORMAT" : "Invalid or unsupported zip format. No END header found"
};

/***/ }),

/***/ 8321:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var fs = __nccwpck_require__(2895).require(),
    pth = __nccwpck_require__(5622);
	
fs.existsSync = fs.existsSync || pth.existsSync;

module.exports = function(/*String*/path) {

    var _path = path || "",
        _permissions = 0,
        _obj = newAttr(),
        _stat = null;

    function newAttr() {
        return {
            directory : false,
            readonly : false,
            hidden : false,
            executable : false,
            mtime : 0,
            atime : 0
        }
    }

    if (_path && fs.existsSync(_path)) {
        _stat = fs.statSync(_path);
        _obj.directory = _stat.isDirectory();
        _obj.mtime = _stat.mtime;
        _obj.atime = _stat.atime;
        _obj.executable = (0o111 & _stat.mode) != 0;    // file is executable who ever har right not just owner
        _obj.readonly   = (0o200 & _stat.mode) == 0;    // readonly if owner has no write right
        _obj.hidden = pth.basename(_path)[0] === ".";
    } else {
        console.warn("Invalid path: " + _path)
    }

    return {

        get directory () {
            return _obj.directory;
        },

        get readOnly () {
            return _obj.readonly;
        },

        get hidden () {
            return _obj.hidden;
        },

        get mtime () {
            return _obj.mtime;
        },

        get atime () {
           return _obj.atime;
        },


        get executable () {
            return _obj.executable;
        },

        decodeAttributes : function(val) {

        },

        encodeAttributes : function (val) {

        },

        toString : function() {
           return '{\n' +
               '\t"path" : "' + _path + ",\n" +
               '\t"isDirectory" : ' + _obj.directory + ",\n" +
               '\t"isReadOnly" : ' + _obj.readonly + ",\n" +
               '\t"isHidden" : ' + _obj.hidden + ",\n" +
               '\t"isExecutable" : ' + _obj.executable + ",\n" +
               '\t"mTime" : ' + _obj.mtime + "\n" +
               '\t"aTime" : ' + _obj.atime + "\n" +
           '}';
        }
    }

};


/***/ }),

/***/ 2895:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

exports.require = function() {
  var fs = __nccwpck_require__(5747);
  if (process && process.versions && process.versions['electron']) {
	  try {
	    originalFs = __nccwpck_require__(2941);
	    if (Object.keys(originalFs).length > 0) {
	      fs = originalFs;
      }
	  } catch (e) {}
  }
  return fs
};


/***/ }),

/***/ 5182:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(1291);
module.exports.FileSystem = __nccwpck_require__(2895);
module.exports.Constants = __nccwpck_require__(4522);
module.exports.Errors = __nccwpck_require__(1255);
module.exports.FileAttr = __nccwpck_require__(8321);

/***/ }),

/***/ 1291:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var fs = __nccwpck_require__(2895).require(),
    pth = __nccwpck_require__(5622);

fs.existsSync = fs.existsSync || pth.existsSync;

module.exports = (function() {

    var crcTable = [],
        Constants = __nccwpck_require__(4522),
        Errors = __nccwpck_require__(1255),

        PATH_SEPARATOR = pth.sep;


    function mkdirSync(/*String*/path) {
        var resolvedPath = path.split(PATH_SEPARATOR)[0];
        path.split(PATH_SEPARATOR).forEach(function(name) {
            if (!name || name.substr(-1,1) === ":") return;
            resolvedPath += PATH_SEPARATOR + name;
            var stat;
            try {
                stat = fs.statSync(resolvedPath);
            } catch (e) {
                fs.mkdirSync(resolvedPath);
            }
            if (stat && stat.isFile())
                throw Errors.FILE_IN_THE_WAY.replace("%s", resolvedPath);
        });
    }

    function findSync(/*String*/dir, /*RegExp*/pattern, /*Boolean*/recoursive) {
        if (typeof pattern === 'boolean') {
            recoursive = pattern;
            pattern = undefined;
        }
        var files = [];
        fs.readdirSync(dir).forEach(function(file) {
            var path = pth.join(dir, file);

            if (fs.statSync(path).isDirectory() && recoursive)
                files = files.concat(findSync(path, pattern, recoursive));

            if (!pattern || pattern.test(path)) {
                files.push(pth.normalize(path) + (fs.statSync(path).isDirectory() ? PATH_SEPARATOR : ""));
            }

        });
        return files;
    }

    function readBigUInt64LE(/*Buffer*/buffer, /*int*/index) {
        var slice = Buffer.from(buffer.slice(index, index + 8));
        slice.swap64();

        return parseInt(`0x${ slice.toString('hex') }`);
    }

    return {
        makeDir : function(/*String*/path) {
            mkdirSync(path);
        },

        crc32 : function(buf) {
            if (typeof buf === 'string') {
                buf = Buffer.from(buf);
            }
            var b = Buffer.alloc(4);
            if (!crcTable.length) {
                for (var n = 0; n < 256; n++) {
                    var c = n;
                    for (var k = 8; --k >= 0;)  //
                        if ((c & 1) !== 0)  { c = 0xedb88320 ^ (c >>> 1); } else { c = c >>> 1; }
                    if (c < 0) {
                        b.writeInt32LE(c, 0);
                        c = b.readUInt32LE(0);
                    }
                    crcTable[n] = c;
                }
            }
            var crc = 0, off = 0, len = buf.length, c1 = ~crc;
            while(--len >= 0) c1 = crcTable[(c1 ^ buf[off++]) & 0xff] ^ (c1 >>> 8);
            crc = ~c1;
            b.writeInt32LE(crc & 0xffffffff, 0);
            return b.readUInt32LE(0);
        },

        methodToString : function(/*Number*/method) {
            switch (method) {
                case Constants.STORED:
                    return 'STORED (' + method + ')';
                case Constants.DEFLATED:
                    return 'DEFLATED (' + method + ')';
                default:
                    return 'UNSUPPORTED (' + method + ')';
            }

        },

        writeFileTo : function(/*String*/path, /*Buffer*/content, /*Boolean*/overwrite, /*Number*/attr) {
            if (fs.existsSync(path)) {
                if (!overwrite)
                    return false; // cannot overwrite

                var stat = fs.statSync(path);
                if (stat.isDirectory()) {
                    return false;
                }
            }
            var folder = pth.dirname(path);
            if (!fs.existsSync(folder)) {
                mkdirSync(folder);
            }

            var fd;
            try {
                fd = fs.openSync(path, 'w', 438); // 0666
            } catch(e) {
                fs.chmodSync(path, 438);
                fd = fs.openSync(path, 'w', 438);
            }
            if (fd) {
                try {
                    fs.writeSync(fd, content, 0, content.length, 0);
                }
                catch (e){
                    throw e;
                }
                finally {
                    fs.closeSync(fd);
                }
            }
            fs.chmodSync(path, attr || 438);
            return true;
        },

        writeFileToAsync : function(/*String*/path, /*Buffer*/content, /*Boolean*/overwrite, /*Number*/attr, /*Function*/callback) {
            if(typeof attr === 'function') {
                callback = attr;
                attr = undefined;
            }

            fs.exists(path, function(exists) {
                if(exists && !overwrite)
                    return callback(false);

                fs.stat(path, function(err, stat) {
                    if(exists &&stat.isDirectory()) {
                        return callback(false);
                    }

                    var folder = pth.dirname(path);
                    fs.exists(folder, function(exists) {
                        if(!exists)
                            mkdirSync(folder);

                        fs.open(path, 'w', 438, function(err, fd) {
                            if(err) {
                                fs.chmod(path, 438, function() {
                                    fs.open(path, 'w', 438, function(err, fd) {
                                        fs.write(fd, content, 0, content.length, 0, function() {
                                            fs.close(fd, function() {
                                                fs.chmod(path, attr || 438, function() {
                                                    callback(true);
                                                })
                                            });
                                        });
                                    });
                                })
                            } else {
                                if(fd) {
                                    fs.write(fd, content, 0, content.length, 0, function() {
                                        fs.close(fd, function() {
                                            fs.chmod(path, attr || 438, function() {
                                                callback(true);
                                            })
                                        });
                                    });
                                } else {
                                    fs.chmod(path, attr || 438, function() {
                                        callback(true);
                                    })
                                }
                            }
                        });
                    })
                })
            })
        },

        findFiles : function(/*String*/path) {
            return findSync(path, true);
        },

        getAttributes : function(/*String*/path) {

        },

        setAttributes : function(/*String*/path) {

        },

        toBuffer : function(input) {
            if (Buffer.isBuffer(input)) {
                return input;
            } else {
                if (input.length === 0) {
                    return Buffer.alloc(0)
                }
                return Buffer.from(input, 'utf8');
            }
        },

        readBigUInt64LE,

        Constants : Constants,
        Errors : Errors
    }
})();


/***/ }),

/***/ 4057:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Utils = __nccwpck_require__(5182),
    Headers = __nccwpck_require__(4958),
    Constants = Utils.Constants,
    Methods = __nccwpck_require__(3928);

module.exports = function (/*Buffer*/input) {
    var _entryHeader = new Headers.EntryHeader(),
        _entryName = Buffer.alloc(0),
        _comment = Buffer.alloc(0),
        _isDirectory = false,
        uncompressedData = null,
        _extra = Buffer.alloc(0);

    function getCompressedDataFromZip() {
        if (!input || !Buffer.isBuffer(input)) {
            return Buffer.alloc(0);
        }
        _entryHeader.loadDataHeaderFromBinary(input);
        return input.slice(_entryHeader.realDataOffset, _entryHeader.realDataOffset + _entryHeader.compressedSize)
    }

    function crc32OK(data) {
        // if bit 3 (0x08) of the general-purpose flags field is set, then the CRC-32 and file sizes are not known when the header is written
        if ((_entryHeader.flags & 0x8) !== 0x8) {
           if (Utils.crc32(data) !== _entryHeader.dataHeader.crc) {
               return false;
           }
        } else {
            // @TODO: load and check data descriptor header
            // The fields in the local header are filled with zero, and the CRC-32 and size are appended in a 12-byte structure
            // (optionally preceded by a 4-byte signature) immediately after the compressed data:
        }
        return true;
    }

    function decompress(/*Boolean*/async, /*Function*/callback, /*String, Buffer*/pass) {
        if(typeof callback === 'undefined' && typeof async === 'string') {
            pass=async;
            async=void 0;
        }
        if (_isDirectory) {
            if (async && callback) {
                callback(Buffer.alloc(0), Utils.Errors.DIRECTORY_CONTENT_ERROR); //si added error.
            }
            return Buffer.alloc(0);
        }

        var compressedData = getCompressedDataFromZip();

        if (compressedData.length === 0) {
            // File is empty, nothing to decompress.
            if (async && callback) callback(compressedData);
            return compressedData;
        }

        if (_entryHeader.encripted){
            if ('string' !== typeof pass && !Buffer.isBuffer(pass)){
                throw new Error('ADM-ZIP: Incompatible password parameter');
            }
            compressedData = Methods.ZipCrypto.decrypt(compressedData, _entryHeader, pass);
        }

        var data = Buffer.alloc(_entryHeader.size);

        switch (_entryHeader.method) {
            case Utils.Constants.STORED:
                compressedData.copy(data);
                if (!crc32OK(data)) {
                    if (async && callback) callback(data, Utils.Errors.BAD_CRC);//si added error
                    throw new Error(Utils.Errors.BAD_CRC);
                } else {//si added otherwise did not seem to return data.
                    if (async && callback) callback(data);
                    return data;
                }
            case Utils.Constants.DEFLATED:
                var inflater = new Methods.Inflater(compressedData);
                if (!async) {
                    var result = inflater.inflate(data);
                    result.copy(data, 0);
                    if (!crc32OK(data)) {
                        throw new Error(Utils.Errors.BAD_CRC + " " + _entryName.toString());
                    }
                    return data;
                } else {
                    inflater.inflateAsync(function(result) {
                        result.copy(data, 0);
                        if (!crc32OK(data)) {
                            if (callback) callback(data, Utils.Errors.BAD_CRC); //si added error
                        } else { //si added otherwise did not seem to return data.
                            if (callback) callback(data);
                        }
                    });
                }
                break;
            default:
                if (async && callback) callback(Buffer.alloc(0), Utils.Errors.UNKNOWN_METHOD);
                throw new Error(Utils.Errors.UNKNOWN_METHOD);
        }
    }

    function compress(/*Boolean*/async, /*Function*/callback) {
        if ((!uncompressedData || !uncompressedData.length) && Buffer.isBuffer(input)) {
            // no data set or the data wasn't changed to require recompression
            if (async && callback) callback(getCompressedDataFromZip());
            return getCompressedDataFromZip();
        }

        if (uncompressedData.length && !_isDirectory) {
            var compressedData;
            // Local file header
            switch (_entryHeader.method) {
                case Utils.Constants.STORED:
                    _entryHeader.compressedSize = _entryHeader.size;

                    compressedData = Buffer.alloc(uncompressedData.length);
                    uncompressedData.copy(compressedData);

                    if (async && callback) callback(compressedData);
                    return compressedData;
                default:
                case Utils.Constants.DEFLATED:

                    var deflater = new Methods.Deflater(uncompressedData);
                    if (!async) {
                        var deflated = deflater.deflate();
                        _entryHeader.compressedSize = deflated.length;
                        return deflated;
                    } else {
                        deflater.deflateAsync(function(data) {
                            compressedData = Buffer.alloc(data.length);
                            _entryHeader.compressedSize = data.length;
                            data.copy(compressedData);
                            callback && callback(compressedData);
                        });
                    }
                    deflater = null;
                    break;
            }
        } else {
            if (async && callback) {
                callback(Buffer.alloc(0));
            } else {
                return Buffer.alloc(0);
            }
        }
    }

    function readUInt64LE(buffer, offset) {
        return (buffer.readUInt32LE(offset + 4) << 4) + buffer.readUInt32LE(offset);
    }

    function parseExtra(data) {
        var offset = 0;
        var signature, size, part;
        while(offset<data.length) {
            signature = data.readUInt16LE(offset);
            offset += 2;
            size = data.readUInt16LE(offset);
            offset += 2;
            part = data.slice(offset, offset+size);
            offset += size;
            if(Constants.ID_ZIP64 === signature) {
                parseZip64ExtendedInformation(part);
            }
        }
    }

    //Override header field values with values from the ZIP64 extra field
    function parseZip64ExtendedInformation(data) {
        var size, compressedSize, offset, diskNumStart;

        if(data.length >= Constants.EF_ZIP64_SCOMP) {
            size = readUInt64LE(data, Constants.EF_ZIP64_SUNCOMP);
            if(_entryHeader.size === Constants.EF_ZIP64_OR_32) {
                _entryHeader.size = size;
            }
        }
        if(data.length >= Constants.EF_ZIP64_RHO) {
            compressedSize = readUInt64LE(data, Constants.EF_ZIP64_SCOMP);
            if(_entryHeader.compressedSize === Constants.EF_ZIP64_OR_32) {
                _entryHeader.compressedSize = compressedSize;
            }
        }
        if(data.length >= Constants.EF_ZIP64_DSN) {
            offset = readUInt64LE(data, Constants.EF_ZIP64_RHO);
            if(_entryHeader.offset === Constants.EF_ZIP64_OR_32) {
                _entryHeader.offset = offset;
            }
        }
        if(data.length >= Constants.EF_ZIP64_DSN+4) {
            diskNumStart = data.readUInt32LE(Constants.EF_ZIP64_DSN);
            if(_entryHeader.diskNumStart === Constants.EF_ZIP64_OR_16) {
                _entryHeader.diskNumStart = diskNumStart;
            }
        }
    }


    return {
        get entryName () { return _entryName.toString(); },
        get rawEntryName() { return _entryName; },
        set entryName (val) {
            _entryName = Utils.toBuffer(val);
            var lastChar = _entryName[_entryName.length - 1];
            _isDirectory = (lastChar === 47) || (lastChar === 92);
            _entryHeader.fileNameLength = _entryName.length;
        },

        get extra () { return _extra; },
        set extra (val) {
            _extra = val;
            _entryHeader.extraLength = val.length;
            parseExtra(val);
        },

        get comment () { return _comment.toString(); },
        set comment (val) {
            _comment = Utils.toBuffer(val);
            _entryHeader.commentLength = _comment.length;
        },

        get name () { var n = _entryName.toString(); return _isDirectory ? n.substr(n.length - 1).split("/").pop() : n.split("/").pop(); },
        get isDirectory () { return _isDirectory },

        getCompressedData : function() {
            return compress(false, null)
        },

        getCompressedDataAsync : function(/*Function*/callback) {
            compress(true, callback)
        },

        setData : function(value) {
            uncompressedData = Utils.toBuffer(value);
            if (!_isDirectory && uncompressedData.length) {
                _entryHeader.size = uncompressedData.length;
                _entryHeader.method = Utils.Constants.DEFLATED;
                _entryHeader.crc = Utils.crc32(value);
                _entryHeader.changed = true;
            } else { // folders and blank files should be stored
                _entryHeader.method = Utils.Constants.STORED;
            }
        },

        getData : function(pass) {
            if (_entryHeader.changed) {
                return uncompressedData;
            } else {
                return decompress(false, null, pass);
            }
        },

        getDataAsync : function(/*Function*/callback, pass) {
            if (_entryHeader.changed) {
                callback(uncompressedData);
            } else {
                decompress(true, callback, pass);
            }
        },

        set attr(attr) { _entryHeader.attr = attr; },
        get attr() { return _entryHeader.attr; },

        set header(/*Buffer*/data) {
            _entryHeader.loadFromBinary(data);
        },

        get header() {
            return _entryHeader;
        },

        packHeader : function() {
            // 1. create header (buffer)
            var header = _entryHeader.entryHeaderToBinary();
            var addpos = Utils.Constants.CENHDR;
            // 2. add file name
            _entryName.copy(header, addpos);
            addpos += _entryName.length;
            // 3. add extra data
            if (_entryHeader.extraLength) {
                _extra.copy(header, addpos);
                addpos += _entryHeader.extraLength;
            }
            // 4. add file comment
            if (_entryHeader.commentLength) {
                _comment.copy(header, addpos);
            }
            return header;
        },

        toString : function() {
            return '{\n' +
                '\t"entryName" : "' + _entryName.toString() + "\",\n" +
                '\t"name" : "' + (_isDirectory ? _entryName.toString().replace(/\/$/, '').split("/").pop() : _entryName.toString().split("/").pop()) + "\",\n" +
                '\t"comment" : "' + _comment.toString() + "\",\n" +
                '\t"isDirectory" : ' + _isDirectory + ",\n" +
                '\t"header" : ' + _entryHeader.toString().replace(/\t/mg, "\t\t").replace(/}/mg, "\t}")  + ",\n" +
                '\t"compressedData" : <' + (input && input.length  + " bytes buffer" || "null") + ">\n" +
                '\t"data" : <' + (uncompressedData && uncompressedData.length  + " bytes buffer" || "null") + ">\n" +
                '}';
        }
    }
};


/***/ }),

/***/ 7744:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const ZipEntry = __nccwpck_require__(4057);
const Headers = __nccwpck_require__(4958);
const Utils = __nccwpck_require__(5182);

module.exports = function (/*Buffer|null*/inBuffer, /** object */options) {
    var entryList = [],
        entryTable = {},
        _comment = Buffer.alloc(0),
        mainHeader = new Headers.MainHeader(),
        loadedEntries = false;

    // assign options
    const opts = Object.assign(Object.create(null), options);

    if (inBuffer){
        // is a memory buffer
        readMainHeader(opts.readEntries);
    } else {
        // none. is a new file
        loadedEntries = true;
    }

	function iterateEntries(callback) {
		const totalEntries = mainHeader.diskEntries; // total number of entries
		let index = mainHeader.offset; // offset of first CEN header

		for (let i = 0; i < totalEntries; i++) {
			let tmp = index;
			const entry = new ZipEntry(inBuffer);

			entry.header = inBuffer.slice(tmp, tmp += Utils.Constants.CENHDR);
			entry.entryName = inBuffer.slice(tmp, tmp += entry.header.fileNameLength);

			index += entry.header.entryHeaderSize;

			callback(entry);
		}
	}

	function readEntries() {
		loadedEntries = true;
		entryTable = {};
		entryList = new Array(mainHeader.diskEntries);  // total number of entries
		var index = mainHeader.offset;  // offset of first CEN header
		for (var i = 0; i < entryList.length; i++) {

			var tmp = index,
				entry = new ZipEntry(inBuffer);
			entry.header = inBuffer.slice(tmp, tmp += Utils.Constants.CENHDR);

			entry.entryName = inBuffer.slice(tmp, tmp += entry.header.fileNameLength);

			if (entry.header.extraLength) {
				entry.extra = inBuffer.slice(tmp, tmp += entry.header.extraLength);
			}

			if (entry.header.commentLength)
				entry.comment = inBuffer.slice(tmp, tmp + entry.header.commentLength);

			index += entry.header.entryHeaderSize;

			entryList[i] = entry;
			entryTable[entry.entryName] = entry;
		}
	}

    function readMainHeader(/*Boolean*/ readNow) {
		var i = inBuffer.length - Utils.Constants.ENDHDR, // END header size
			max = Math.max(0, i - 0xFFFF), // 0xFFFF is the max zip file comment length
			n = max,
			endStart = inBuffer.length,
			endOffset = -1, // Start offset of the END header
			commentEnd = 0;

		for (i; i >= n; i--) {
			if (inBuffer[i] !== 0x50) continue; // quick check that the byte is 'P'
			if (inBuffer.readUInt32LE(i) === Utils.Constants.ENDSIG) { // "PK\005\006"
				endOffset = i;
				commentEnd = i;
				endStart = i + Utils.Constants.ENDHDR;
				// We already found a regular signature, let's look just a bit further to check if there's any zip64 signature
				n = i - Utils.Constants.END64HDR;
				continue;
			}

			if (inBuffer.readUInt32LE(i) === Utils.Constants.END64SIG) {
				// Found a zip64 signature, let's continue reading the whole zip64 record
				n = max;
				continue;
			}

			if (inBuffer.readUInt32LE(i) == Utils.Constants.ZIP64SIG) {
				// Found the zip64 record, let's determine it's size
				endOffset = i;
				endStart = i + Utils.readBigUInt64LE(inBuffer, i + Utils.Constants.ZIP64SIZE) + Utils.Constants.ZIP64LEAD;
				break;
			}
		}

		if (!~endOffset)
			throw new Error(Utils.Errors.INVALID_FORMAT);

		mainHeader.loadFromBinary(inBuffer.slice(endOffset, endStart));
		if (mainHeader.commentLength) {
			_comment = inBuffer.slice(commentEnd + Utils.Constants.ENDHDR);
		}
        if (readNow) readEntries();
    }

	return {
		/**
		 * Returns an array of ZipEntry objects existent in the current opened archive
		 * @return Array
		 */
		get entries() {
			if (!loadedEntries) {
				readEntries();
			}
			return entryList;
		},

		/**
		 * Archive comment
		 * @return {String}
		 */
		get comment() {
			return _comment.toString();
		},
		set comment(val) {
			_comment = Utils.toBuffer(val);
			mainHeader.commentLength = _comment.length;
		},

		getEntryCount: function() {
			if (!loadedEntries) {
				return mainHeader.diskEntries;
			}

			return entryList.length;
		},

		forEach: function(callback) {
			if (!loadedEntries) {
				iterateEntries(callback);
				return;
			}

			entryList.forEach(callback);
		},

		/**
		 * Returns a reference to the entry with the given name or null if entry is inexistent
		 *
		 * @param entryName
		 * @return ZipEntry
		 */
		getEntry: function (/*String*/entryName) {
			if (!loadedEntries) {
				readEntries();
			}
			return entryTable[entryName] || null;
		},

		/**
		 * Adds the given entry to the entry list
		 *
		 * @param entry
		 */
		setEntry: function (/*ZipEntry*/entry) {
			if (!loadedEntries) {
				readEntries();
			}
			entryList.push(entry);
			entryTable[entry.entryName] = entry;
			mainHeader.totalEntries = entryList.length;
		},

		/**
		 * Removes the entry with the given name from the entry list.
		 *
		 * If the entry is a directory, then all nested files and directories will be removed
		 * @param entryName
		 */
		deleteEntry: function (/*String*/entryName) {
			if (!loadedEntries) {
				readEntries();
			}
			var entry = entryTable[entryName];
			if (entry && entry.isDirectory) {
				var _self = this;
				this.getEntryChildren(entry).forEach(function (child) {
					if (child.entryName !== entryName) {
						_self.deleteEntry(child.entryName)
					}
				})
			}
			entryList.splice(entryList.indexOf(entry), 1);
			delete(entryTable[entryName]);
			mainHeader.totalEntries = entryList.length;
		},

		/**
		 *  Iterates and returns all nested files and directories of the given entry
		 *
		 * @param entry
		 * @return Array
		 */
		getEntryChildren: function (/*ZipEntry*/entry) {
			if (!loadedEntries) {
				readEntries();
			}
			if (entry.isDirectory) {
				var list = [],
					name = entry.entryName,
					len = name.length;

				entryList.forEach(function (zipEntry) {
					if (zipEntry.entryName.substr(0, len) === name) {
						list.push(zipEntry);
					}
				});
				return list;
			}
			return []
		},

		/**
		 * Returns the zip file
		 *
		 * @return Buffer
		 */
		compressToBuffer: function () {
			if (!loadedEntries) {
				readEntries();
			}
			if (entryList.length > 1) {
				entryList.sort(function (a, b) {
					var nameA = a.entryName.toLowerCase();
					var nameB = b.entryName.toLowerCase();
					if (nameA < nameB) {
						return -1
					}
					if (nameA > nameB) {
						return 1
					}
					return 0;
				});
			}

			var totalSize = 0,
				dataBlock = [],
				entryHeaders = [],
				dindex = 0;

			mainHeader.size = 0;
			mainHeader.offset = 0;

			entryList.forEach(function (entry) {
				// compress data and set local and entry header accordingly. Reason why is called first
				var compressedData = entry.getCompressedData();
				// data header
				entry.header.offset = dindex;
				var dataHeader = entry.header.dataHeaderToBinary();
				var entryNameLen = entry.rawEntryName.length;
				var extra = entry.extra.toString();
				var postHeader = Buffer.alloc(entryNameLen + extra.length);
				entry.rawEntryName.copy(postHeader, 0);
				postHeader.fill(extra, entryNameLen);

				var dataLength = dataHeader.length + postHeader.length + compressedData.length;

				dindex += dataLength;

				dataBlock.push(dataHeader);
				dataBlock.push(postHeader);
				dataBlock.push(compressedData);

				var entryHeader = entry.packHeader();
				entryHeaders.push(entryHeader);
				mainHeader.size += entryHeader.length;
				totalSize += (dataLength + entryHeader.length);
			});

			totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
			// point to end of data and beginning of central directory first record
			mainHeader.offset = dindex;

			dindex = 0;
			var outBuffer = Buffer.alloc(totalSize);
			dataBlock.forEach(function (content) {
				content.copy(outBuffer, dindex); // write data blocks
				dindex += content.length;
			});
			entryHeaders.forEach(function (content) {
				content.copy(outBuffer, dindex); // write central directory entries
				dindex += content.length;
			});

			var mh = mainHeader.toBinary();
			if (_comment) {
				Buffer.from(_comment).copy(mh, Utils.Constants.ENDHDR); // add zip file comment
			}

			mh.copy(outBuffer, dindex); // write main header

			return outBuffer;
		},

		toAsyncBuffer: function (/*Function*/onSuccess, /*Function*/onFail, /*Function*/onItemStart, /*Function*/onItemEnd) {
			if (!loadedEntries) {
				readEntries();
			}
			if (entryList.length > 1) {
				entryList.sort(function (a, b) {
					var nameA = a.entryName.toLowerCase();
					var nameB = b.entryName.toLowerCase();
					if (nameA > nameB) {
						return -1
					}
					if (nameA < nameB) {
						return 1
					}
					return 0;
				});
			}

			var totalSize = 0,
				dataBlock = [],
				entryHeaders = [],
				dindex = 0;

			mainHeader.size = 0;
			mainHeader.offset = 0;

			var compress = function (entryList) {
				var self = arguments.callee;
				if (entryList.length) {
					var entry = entryList.pop();
					var name = entry.entryName + entry.extra.toString();
					if (onItemStart) onItemStart(name);
					entry.getCompressedDataAsync(function (compressedData) {
						if (onItemEnd) onItemEnd(name);

						entry.header.offset = dindex;
						// data header
						var dataHeader = entry.header.dataHeaderToBinary();
						var postHeader;
						try {
							postHeader = Buffer.alloc(name.length, name);  // using alloc will work on node  5.x+
						} catch(e){
							postHeader = new Buffer(name); // use deprecated method if alloc fails...
						}
						var dataLength = dataHeader.length + postHeader.length + compressedData.length;

						dindex += dataLength;

						dataBlock.push(dataHeader);
						dataBlock.push(postHeader);
						dataBlock.push(compressedData);

						var entryHeader = entry.packHeader();
						entryHeaders.push(entryHeader);
						mainHeader.size += entryHeader.length;
						totalSize += (dataLength + entryHeader.length);

						if (entryList.length) {
							self(entryList);
						} else {


							totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
							// point to end of data and beginning of central directory first record
							mainHeader.offset = dindex;

							dindex = 0;
							var outBuffer = Buffer.alloc(totalSize);
							dataBlock.forEach(function (content) {
								content.copy(outBuffer, dindex); // write data blocks
								dindex += content.length;
							});
							entryHeaders.forEach(function (content) {
								content.copy(outBuffer, dindex); // write central directory entries
								dindex += content.length;
							});

							var mh = mainHeader.toBinary();
							if (_comment) {
								_comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
							}

							mh.copy(outBuffer, dindex); // write main header

							onSuccess(outBuffer);
						}
					});
				}
			};

			compress(entryList);
		}
	}
};


/***/ }),

/***/ 9051:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const fs = __nccwpck_require__(5747)
const path = __nccwpck_require__(5622)

/* istanbul ignore next */
const LCHOWN = fs.lchown ? 'lchown' : 'chown'
/* istanbul ignore next */
const LCHOWNSYNC = fs.lchownSync ? 'lchownSync' : 'chownSync'

/* istanbul ignore next */
const needEISDIRHandled = fs.lchown &&
  !process.version.match(/v1[1-9]+\./) &&
  !process.version.match(/v10\.[6-9]/)

const lchownSync = (path, uid, gid) => {
  try {
    return fs[LCHOWNSYNC](path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const chownSync = (path, uid, gid) => {
  try {
    return fs.chownSync(path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const handleEISDIR =
  needEISDIRHandled ? (path, uid, gid, cb) => er => {
    // Node prior to v10 had a very questionable implementation of
    // fs.lchown, which would always try to call fs.open on a directory
    // Fall back to fs.chown in those cases.
    if (!er || er.code !== 'EISDIR')
      cb(er)
    else
      fs.chown(path, uid, gid, cb)
  }
  : (_, __, ___, cb) => cb

/* istanbul ignore next */
const handleEISDirSync =
  needEISDIRHandled ? (path, uid, gid) => {
    try {
      return lchownSync(path, uid, gid)
    } catch (er) {
      if (er.code !== 'EISDIR')
        throw er
      chownSync(path, uid, gid)
    }
  }
  : (path, uid, gid) => lchownSync(path, uid, gid)

// fs.readdir could only accept an options object as of node v6
const nodeVersion = process.version
let readdir = (path, options, cb) => fs.readdir(path, options, cb)
let readdirSync = (path, options) => fs.readdirSync(path, options)
/* istanbul ignore next */
if (/^v4\./.test(nodeVersion))
  readdir = (path, options, cb) => fs.readdir(path, cb)

const chown = (cpath, uid, gid, cb) => {
  fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, er => {
    // Skip ENOENT error
    cb(er && er.code !== 'ENOENT' ? er : null)
  }))
}

const chownrKid = (p, child, uid, gid, cb) => {
  if (typeof child === 'string')
    return fs.lstat(path.resolve(p, child), (er, stats) => {
      // Skip ENOENT error
      if (er)
        return cb(er.code !== 'ENOENT' ? er : null)
      stats.name = child
      chownrKid(p, stats, uid, gid, cb)
    })

  if (child.isDirectory()) {
    chownr(path.resolve(p, child.name), uid, gid, er => {
      if (er)
        return cb(er)
      const cpath = path.resolve(p, child.name)
      chown(cpath, uid, gid, cb)
    })
  } else {
    const cpath = path.resolve(p, child.name)
    chown(cpath, uid, gid, cb)
  }
}


const chownr = (p, uid, gid, cb) => {
  readdir(p, { withFileTypes: true }, (er, children) => {
    // any error other than ENOTDIR or ENOTSUP means it's not readable,
    // or doesn't exist.  give up.
    if (er) {
      if (er.code === 'ENOENT')
        return cb()
      else if (er.code !== 'ENOTDIR' && er.code !== 'ENOTSUP')
        return cb(er)
    }
    if (er || !children.length)
      return chown(p, uid, gid, cb)

    let len = children.length
    let errState = null
    const then = er => {
      if (errState)
        return
      if (er)
        return cb(errState = er)
      if (-- len === 0)
        return chown(p, uid, gid, cb)
    }

    children.forEach(child => chownrKid(p, child, uid, gid, then))
  })
}

const chownrKidSync = (p, child, uid, gid) => {
  if (typeof child === 'string') {
    try {
      const stats = fs.lstatSync(path.resolve(p, child))
      stats.name = child
      child = stats
    } catch (er) {
      if (er.code === 'ENOENT')
        return
      else
        throw er
    }
  }

  if (child.isDirectory())
    chownrSync(path.resolve(p, child.name), uid, gid)

  handleEISDirSync(path.resolve(p, child.name), uid, gid)
}

const chownrSync = (p, uid, gid) => {
  let children
  try {
    children = readdirSync(p, { withFileTypes: true })
  } catch (er) {
    if (er.code === 'ENOENT')
      return
    else if (er.code === 'ENOTDIR' || er.code === 'ENOTSUP')
      return handleEISDirSync(p, uid, gid)
    else
      throw er
  }

  if (children && children.length)
    children.forEach(child => chownrKidSync(p, child, uid, gid))

  return handleEISDirSync(p, uid, gid)
}

module.exports = chownr
chownr.sync = chownrSync


/***/ }),

/***/ 8222:
/***/ ((module, exports, __nccwpck_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __nccwpck_require__(6243)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 6243:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __nccwpck_require__(900);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 8237:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __nccwpck_require__(8222);
} else {
	module.exports = __nccwpck_require__(5332);
}


/***/ }),

/***/ 5332:
/***/ ((module, exports, __nccwpck_require__) => {

/**
 * Module dependencies.
 */

const tty = __nccwpck_require__(3867);
const util = __nccwpck_require__(1669);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __nccwpck_require__(9318);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __nccwpck_require__(6243)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 1133:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var debug;

module.exports = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = __nccwpck_require__(8237)("follow-redirects");
    }
    catch (error) {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};


/***/ }),

/***/ 7707:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var url = __nccwpck_require__(8835);
var URL = url.URL;
var http = __nccwpck_require__(8605);
var https = __nccwpck_require__(7211);
var Writable = __nccwpck_require__(2413).Writable;
var assert = __nccwpck_require__(2357);
var debug = __nccwpck_require__(1133);

// Create handlers that pass events from native requests
var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  ""
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;
  if (callback) {
    this.on("timeout", callback);
  }

  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  }

  // Sets up a timer to trigger a timeout event
  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }
    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  }

  // Prevent a timeout from triggering
  function clearTimer() {
    clearTimeout(this._timeout);
    if (callback) {
      self.removeListener("timeout", callback);
    }
    if (!this.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  }

  // Start the timer when the socket is opened
  if (this.socket) {
    startTimer(this.socket);
  }
  else {
    this._currentRequest.once("socket", startTimer);
  }

  this.on("socket", destroyOnTimeout);
  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

// Proxy all other public ClientRequest methods
[
  "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    abortRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname;

    // Create the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the Authorization header if redirecting to another host
    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var e = 0; e < events.length; e++) {
    request.removeListener(events[e], eventHandlers[events[e]]);
  }
  request.on("error", noop);
  request.abort();
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ 7714:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";

const MiniPass = __nccwpck_require__(1077)
const EE = __nccwpck_require__(8614).EventEmitter
const fs = __nccwpck_require__(5747)

let writev = fs.writev
/* istanbul ignore next */
if (!writev) {
  // This entire block can be removed if support for earlier than Node.js
  // 12.9.0 is not needed.
  const binding = process.binding('fs')
  const FSReqWrap = binding.FSReqWrap || binding.FSReqCallback

  writev = (fd, iovec, pos, cb) => {
    const done = (er, bw) => cb(er, bw, iovec)
    const req = new FSReqWrap()
    req.oncomplete = done
    binding.writeBuffers(fd, iovec, pos, req)
  }
}

const _autoClose = Symbol('_autoClose')
const _close = Symbol('_close')
const _ended = Symbol('_ended')
const _fd = Symbol('_fd')
const _finished = Symbol('_finished')
const _flags = Symbol('_flags')
const _flush = Symbol('_flush')
const _handleChunk = Symbol('_handleChunk')
const _makeBuf = Symbol('_makeBuf')
const _mode = Symbol('_mode')
const _needDrain = Symbol('_needDrain')
const _onerror = Symbol('_onerror')
const _onopen = Symbol('_onopen')
const _onread = Symbol('_onread')
const _onwrite = Symbol('_onwrite')
const _open = Symbol('_open')
const _path = Symbol('_path')
const _pos = Symbol('_pos')
const _queue = Symbol('_queue')
const _read = Symbol('_read')
const _readSize = Symbol('_readSize')
const _reading = Symbol('_reading')
const _remain = Symbol('_remain')
const _size = Symbol('_size')
const _write = Symbol('_write')
const _writing = Symbol('_writing')
const _defaultFlag = Symbol('_defaultFlag')
const _errored = Symbol('_errored')

class ReadStream extends MiniPass {
  constructor (path, opt) {
    opt = opt || {}
    super(opt)

    this.readable = true
    this.writable = false

    if (typeof path !== 'string')
      throw new TypeError('path must be a string')

    this[_errored] = false
    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null
    this[_path] = path
    this[_readSize] = opt.readSize || 16*1024*1024
    this[_reading] = false
    this[_size] = typeof opt.size === 'number' ? opt.size : Infinity
    this[_remain] = this[_size]
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true

    if (typeof this[_fd] === 'number')
      this[_read]()
    else
      this[_open]()
  }

  get fd () { return this[_fd] }
  get path () { return this[_path] }

  write () {
    throw new TypeError('this is a readable stream')
  }

  end () {
    throw new TypeError('this is a readable stream')
  }

  [_open] () {
    fs.open(this[_path], 'r', (er, fd) => this[_onopen](er, fd))
  }

  [_onopen] (er, fd) {
    if (er)
      this[_onerror](er)
    else {
      this[_fd] = fd
      this.emit('open', fd)
      this[_read]()
    }
  }

  [_makeBuf] () {
    return Buffer.allocUnsafe(Math.min(this[_readSize], this[_remain]))
  }

  [_read] () {
    if (!this[_reading]) {
      this[_reading] = true
      const buf = this[_makeBuf]()
      /* istanbul ignore if */
      if (buf.length === 0)
        return process.nextTick(() => this[_onread](null, 0, buf))
      fs.read(this[_fd], buf, 0, buf.length, null, (er, br, buf) =>
        this[_onread](er, br, buf))
    }
  }

  [_onread] (er, br, buf) {
    this[_reading] = false
    if (er)
      this[_onerror](er)
    else if (this[_handleChunk](br, buf))
      this[_read]()
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd]
      this[_fd] = null
      fs.close(fd, er => er ? this.emit('error', er) : this.emit('close'))
    }
  }

  [_onerror] (er) {
    this[_reading] = true
    this[_close]()
    this.emit('error', er)
  }

  [_handleChunk] (br, buf) {
    let ret = false
    // no effect if infinite
    this[_remain] -= br
    if (br > 0)
      ret = super.write(br < buf.length ? buf.slice(0, br) : buf)

    if (br === 0 || this[_remain] <= 0) {
      ret = false
      this[_close]()
      super.end()
    }

    return ret
  }

  emit (ev, data) {
    switch (ev) {
      case 'prefinish':
      case 'finish':
        break

      case 'drain':
        if (typeof this[_fd] === 'number')
          this[_read]()
        break

      case 'error':
        if (this[_errored])
          return
        this[_errored] = true
        return super.emit(ev, data)

      default:
        return super.emit(ev, data)
    }
  }
}

class ReadStreamSync extends ReadStream {
  [_open] () {
    let threw = true
    try {
      this[_onopen](null, fs.openSync(this[_path], 'r'))
      threw = false
    } finally {
      if (threw)
        this[_close]()
    }
  }

  [_read] () {
    let threw = true
    try {
      if (!this[_reading]) {
        this[_reading] = true
        do {
          const buf = this[_makeBuf]()
          /* istanbul ignore next */
          const br = buf.length === 0 ? 0
            : fs.readSync(this[_fd], buf, 0, buf.length, null)
          if (!this[_handleChunk](br, buf))
            break
        } while (true)
        this[_reading] = false
      }
      threw = false
    } finally {
      if (threw)
        this[_close]()
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd]
      this[_fd] = null
      fs.closeSync(fd)
      this.emit('close')
    }
  }
}

class WriteStream extends EE {
  constructor (path, opt) {
    opt = opt || {}
    super(opt)
    this.readable = false
    this.writable = true
    this[_errored] = false
    this[_writing] = false
    this[_ended] = false
    this[_needDrain] = false
    this[_queue] = []
    this[_path] = path
    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null
    this[_mode] = opt.mode === undefined ? 0o666 : opt.mode
    this[_pos] = typeof opt.start === 'number' ? opt.start : null
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true

    // truncating makes no sense when writing into the middle
    const defaultFlag = this[_pos] !== null ? 'r+' : 'w'
    this[_defaultFlag] = opt.flags === undefined
    this[_flags] = this[_defaultFlag] ? defaultFlag : opt.flags

    if (this[_fd] === null)
      this[_open]()
  }

  emit (ev, data) {
    if (ev === 'error') {
      if (this[_errored])
        return
      this[_errored] = true
    }
    return super.emit(ev, data)
  }


  get fd () { return this[_fd] }
  get path () { return this[_path] }

  [_onerror] (er) {
    this[_close]()
    this[_writing] = true
    this.emit('error', er)
  }

  [_open] () {
    fs.open(this[_path], this[_flags], this[_mode],
      (er, fd) => this[_onopen](er, fd))
  }

  [_onopen] (er, fd) {
    if (this[_defaultFlag] &&
        this[_flags] === 'r+' &&
        er && er.code === 'ENOENT') {
      this[_flags] = 'w'
      this[_open]()
    } else if (er)
      this[_onerror](er)
    else {
      this[_fd] = fd
      this.emit('open', fd)
      this[_flush]()
    }
  }

  end (buf, enc) {
    if (buf)
      this.write(buf, enc)

    this[_ended] = true

    // synthetic after-write logic, where drain/finish live
    if (!this[_writing] && !this[_queue].length &&
        typeof this[_fd] === 'number')
      this[_onwrite](null, 0)
    return this
  }

  write (buf, enc) {
    if (typeof buf === 'string')
      buf = Buffer.from(buf, enc)

    if (this[_ended]) {
      this.emit('error', new Error('write() after end()'))
      return false
    }

    if (this[_fd] === null || this[_writing] || this[_queue].length) {
      this[_queue].push(buf)
      this[_needDrain] = true
      return false
    }

    this[_writing] = true
    this[_write](buf)
    return true
  }

  [_write] (buf) {
    fs.write(this[_fd], buf, 0, buf.length, this[_pos], (er, bw) =>
      this[_onwrite](er, bw))
  }

  [_onwrite] (er, bw) {
    if (er)
      this[_onerror](er)
    else {
      if (this[_pos] !== null)
        this[_pos] += bw
      if (this[_queue].length)
        this[_flush]()
      else {
        this[_writing] = false

        if (this[_ended] && !this[_finished]) {
          this[_finished] = true
          this[_close]()
          this.emit('finish')
        } else if (this[_needDrain]) {
          this[_needDrain] = false
          this.emit('drain')
        }
      }
    }
  }

  [_flush] () {
    if (this[_queue].length === 0) {
      if (this[_ended])
        this[_onwrite](null, 0)
    } else if (this[_queue].length === 1)
      this[_write](this[_queue].pop())
    else {
      const iovec = this[_queue]
      this[_queue] = []
      writev(this[_fd], iovec, this[_pos],
        (er, bw) => this[_onwrite](er, bw))
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd]
      this[_fd] = null
      fs.close(fd, er => er ? this.emit('error', er) : this.emit('close'))
    }
  }
}

class WriteStreamSync extends WriteStream {
  [_open] () {
    let fd
    // only wrap in a try{} block if we know we'll retry, to avoid
    // the rethrow obscuring the error's source frame in most cases.
    if (this[_defaultFlag] && this[_flags] === 'r+') {
      try {
        fd = fs.openSync(this[_path], this[_flags], this[_mode])
      } catch (er) {
        if (er.code === 'ENOENT') {
          this[_flags] = 'w'
          return this[_open]()
        } else
          throw er
      }
    } else
      fd = fs.openSync(this[_path], this[_flags], this[_mode])

    this[_onopen](null, fd)
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      const fd = this[_fd]
      this[_fd] = null
      fs.closeSync(fd)
      this.emit('close')
    }
  }

  [_write] (buf) {
    // throw the original, but try to close if it fails
    let threw = true
    try {
      this[_onwrite](null,
        fs.writeSync(this[_fd], buf, 0, buf.length, this[_pos]))
      threw = false
    } finally {
      if (threw)
        try { this[_close]() } catch (_) {}
    }
  }
}

exports.ReadStream = ReadStream
exports.ReadStreamSync = ReadStreamSync

exports.WriteStream = WriteStream
exports.WriteStreamSync = WriteStreamSync


/***/ }),

/***/ 1621:
/***/ ((module) => {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ 1077:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const EE = __nccwpck_require__(8614)
const Stream = __nccwpck_require__(2413)
const Yallist = __nccwpck_require__(665)
const SD = __nccwpck_require__(4304).StringDecoder

const EOF = Symbol('EOF')
const MAYBE_EMIT_END = Symbol('maybeEmitEnd')
const EMITTED_END = Symbol('emittedEnd')
const EMITTING_END = Symbol('emittingEnd')
const CLOSED = Symbol('closed')
const READ = Symbol('read')
const FLUSH = Symbol('flush')
const FLUSHCHUNK = Symbol('flushChunk')
const ENCODING = Symbol('encoding')
const DECODER = Symbol('decoder')
const FLOWING = Symbol('flowing')
const PAUSED = Symbol('paused')
const RESUME = Symbol('resume')
const BUFFERLENGTH = Symbol('bufferLength')
const BUFFERPUSH = Symbol('bufferPush')
const BUFFERSHIFT = Symbol('bufferShift')
const OBJECTMODE = Symbol('objectMode')
const DESTROYED = Symbol('destroyed')

// TODO remove when Node v8 support drops
const doIter = global._MP_NO_ITERATOR_SYMBOLS_  !== '1'
const ASYNCITERATOR = doIter && Symbol.asyncIterator
  || Symbol('asyncIterator not implemented')
const ITERATOR = doIter && Symbol.iterator
  || Symbol('iterator not implemented')

// events that mean 'the stream is over'
// these are treated specially, and re-emitted
// if they are listened for after emitting.
const isEndish = ev =>
  ev === 'end' ||
  ev === 'finish' ||
  ev === 'prefinish'

const isArrayBuffer = b => b instanceof ArrayBuffer ||
  typeof b === 'object' &&
  b.constructor &&
  b.constructor.name === 'ArrayBuffer' &&
  b.byteLength >= 0

const isArrayBufferView = b => !Buffer.isBuffer(b) && ArrayBuffer.isView(b)

module.exports = class Minipass extends Stream {
  constructor (options) {
    super()
    this[FLOWING] = false
    // whether we're explicitly paused
    this[PAUSED] = false
    this.pipes = new Yallist()
    this.buffer = new Yallist()
    this[OBJECTMODE] = options && options.objectMode || false
    if (this[OBJECTMODE])
      this[ENCODING] = null
    else
      this[ENCODING] = options && options.encoding || null
    if (this[ENCODING] === 'buffer')
      this[ENCODING] = null
    this[DECODER] = this[ENCODING] ? new SD(this[ENCODING]) : null
    this[EOF] = false
    this[EMITTED_END] = false
    this[EMITTING_END] = false
    this[CLOSED] = false
    this.writable = true
    this.readable = true
    this[BUFFERLENGTH] = 0
    this[DESTROYED] = false
  }

  get bufferLength () { return this[BUFFERLENGTH] }

  get encoding () { return this[ENCODING] }
  set encoding (enc) {
    if (this[OBJECTMODE])
      throw new Error('cannot set encoding in objectMode')

    if (this[ENCODING] && enc !== this[ENCODING] &&
        (this[DECODER] && this[DECODER].lastNeed || this[BUFFERLENGTH]))
      throw new Error('cannot change encoding')

    if (this[ENCODING] !== enc) {
      this[DECODER] = enc ? new SD(enc) : null
      if (this.buffer.length)
        this.buffer = this.buffer.map(chunk => this[DECODER].write(chunk))
    }

    this[ENCODING] = enc
  }

  setEncoding (enc) {
    this.encoding = enc
  }

  get objectMode () { return this[OBJECTMODE] }
  set objectMode (om) { this[OBJECTMODE] = this[OBJECTMODE] || !!om }

  write (chunk, encoding, cb) {
    if (this[EOF])
      throw new Error('write after end')

    if (this[DESTROYED]) {
      this.emit('error', Object.assign(
        new Error('Cannot call write after a stream was destroyed'),
        { code: 'ERR_STREAM_DESTROYED' }
      ))
      return true
    }

    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'

    if (!encoding)
      encoding = 'utf8'

    // convert array buffers and typed array views into buffers
    // at some point in the future, we may want to do the opposite!
    // leave strings and buffers as-is
    // anything else switches us into object mode
    if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
      if (isArrayBufferView(chunk))
        chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength)
      else if (isArrayBuffer(chunk))
        chunk = Buffer.from(chunk)
      else if (typeof chunk !== 'string')
        // use the setter so we throw if we have encoding set
        this.objectMode = true
    }

    // this ensures at this point that the chunk is a buffer or string
    // don't buffer it up or send it to the decoder
    if (!this.objectMode && !chunk.length) {
      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable')
      if (cb)
        cb()
      return this.flowing
    }

    // fast-path writing strings of same encoding to a stream with
    // an empty buffer, skipping the buffer/decoder dance
    if (typeof chunk === 'string' && !this[OBJECTMODE] &&
        // unless it is a string already ready for us to use
        !(encoding === this[ENCODING] && !this[DECODER].lastNeed)) {
      chunk = Buffer.from(chunk, encoding)
    }

    if (Buffer.isBuffer(chunk) && this[ENCODING])
      chunk = this[DECODER].write(chunk)

    if (this.flowing) {
      // if we somehow have something in the buffer, but we think we're
      // flowing, then we need to flush all that out first, or we get
      // chunks coming in out of order.  Can't emit 'drain' here though,
      // because we're mid-write, so that'd be bad.
      if (this[BUFFERLENGTH] !== 0)
        this[FLUSH](true)
      this.emit('data', chunk)
    } else
      this[BUFFERPUSH](chunk)

    if (this[BUFFERLENGTH] !== 0)
      this.emit('readable')

    if (cb)
      cb()

    return this.flowing
  }

  read (n) {
    if (this[DESTROYED])
      return null

    try {
      if (this[BUFFERLENGTH] === 0 || n === 0 || n > this[BUFFERLENGTH])
        return null

      if (this[OBJECTMODE])
        n = null

      if (this.buffer.length > 1 && !this[OBJECTMODE]) {
        if (this.encoding)
          this.buffer = new Yallist([
            Array.from(this.buffer).join('')
          ])
        else
          this.buffer = new Yallist([
            Buffer.concat(Array.from(this.buffer), this[BUFFERLENGTH])
          ])
      }

      return this[READ](n || null, this.buffer.head.value)
    } finally {
      this[MAYBE_EMIT_END]()
    }
  }

  [READ] (n, chunk) {
    if (n === chunk.length || n === null)
      this[BUFFERSHIFT]()
    else {
      this.buffer.head.value = chunk.slice(n)
      chunk = chunk.slice(0, n)
      this[BUFFERLENGTH] -= n
    }

    this.emit('data', chunk)

    if (!this.buffer.length && !this[EOF])
      this.emit('drain')

    return chunk
  }

  end (chunk, encoding, cb) {
    if (typeof chunk === 'function')
      cb = chunk, chunk = null
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'
    if (chunk)
      this.write(chunk, encoding)
    if (cb)
      this.once('end', cb)
    this[EOF] = true
    this.writable = false

    // if we haven't written anything, then go ahead and emit,
    // even if we're not reading.
    // we'll re-emit if a new 'end' listener is added anyway.
    // This makes MP more suitable to write-only use cases.
    if (this.flowing || !this[PAUSED])
      this[MAYBE_EMIT_END]()
    return this
  }

  // don't let the internal resume be overwritten
  [RESUME] () {
    if (this[DESTROYED])
      return

    this[PAUSED] = false
    this[FLOWING] = true
    this.emit('resume')
    if (this.buffer.length)
      this[FLUSH]()
    else if (this[EOF])
      this[MAYBE_EMIT_END]()
    else
      this.emit('drain')
  }

  resume () {
    return this[RESUME]()
  }

  pause () {
    this[FLOWING] = false
    this[PAUSED] = true
  }

  get destroyed () {
    return this[DESTROYED]
  }

  get flowing () {
    return this[FLOWING]
  }

  get paused () {
    return this[PAUSED]
  }

  [BUFFERPUSH] (chunk) {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] += 1
    else
      this[BUFFERLENGTH] += chunk.length
    return this.buffer.push(chunk)
  }

  [BUFFERSHIFT] () {
    if (this.buffer.length) {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] -= 1
      else
        this[BUFFERLENGTH] -= this.buffer.head.value.length
    }
    return this.buffer.shift()
  }

  [FLUSH] (noDrain) {
    do {} while (this[FLUSHCHUNK](this[BUFFERSHIFT]()))

    if (!noDrain && !this.buffer.length && !this[EOF])
      this.emit('drain')
  }

  [FLUSHCHUNK] (chunk) {
    return chunk ? (this.emit('data', chunk), this.flowing) : false
  }

  pipe (dest, opts) {
    if (this[DESTROYED])
      return

    const ended = this[EMITTED_END]
    opts = opts || {}
    if (dest === process.stdout || dest === process.stderr)
      opts.end = false
    else
      opts.end = opts.end !== false

    const p = { dest: dest, opts: opts, ondrain: _ => this[RESUME]() }
    this.pipes.push(p)

    dest.on('drain', p.ondrain)
    this[RESUME]()
    // piping an ended stream ends immediately
    if (ended && p.opts.end)
      p.dest.end()
    return dest
  }

  addListener (ev, fn) {
    return this.on(ev, fn)
  }

  on (ev, fn) {
    try {
      return super.on(ev, fn)
    } finally {
      if (ev === 'data' && !this.pipes.length && !this.flowing)
        this[RESUME]()
      else if (isEndish(ev) && this[EMITTED_END]) {
        super.emit(ev)
        this.removeAllListeners(ev)
      }
    }
  }

  get emittedEnd () {
    return this[EMITTED_END]
  }

  [MAYBE_EMIT_END] () {
    if (!this[EMITTING_END] &&
        !this[EMITTED_END] &&
        !this[DESTROYED] &&
        this.buffer.length === 0 &&
        this[EOF]) {
      this[EMITTING_END] = true
      this.emit('end')
      this.emit('prefinish')
      this.emit('finish')
      if (this[CLOSED])
        this.emit('close')
      this[EMITTING_END] = false
    }
  }

  emit (ev, data) {
    // error and close are only events allowed after calling destroy()
    if (ev !== 'error' && ev !== 'close' && ev !== DESTROYED && this[DESTROYED])
      return
    else if (ev === 'data') {
      if (!data)
        return

      if (this.pipes.length)
        this.pipes.forEach(p =>
          p.dest.write(data) === false && this.pause())
    } else if (ev === 'end') {
      // only actual end gets this treatment
      if (this[EMITTED_END] === true)
        return

      this[EMITTED_END] = true
      this.readable = false

      if (this[DECODER]) {
        data = this[DECODER].end()
        if (data) {
          this.pipes.forEach(p => p.dest.write(data))
          super.emit('data', data)
        }
      }

      this.pipes.forEach(p => {
        p.dest.removeListener('drain', p.ondrain)
        if (p.opts.end)
          p.dest.end()
      })
    } else if (ev === 'close') {
      this[CLOSED] = true
      // don't emit close before 'end' and 'finish'
      if (!this[EMITTED_END] && !this[DESTROYED])
        return
    }

    // TODO: replace with a spread operator when Node v4 support drops
    const args = new Array(arguments.length)
    args[0] = ev
    args[1] = data
    if (arguments.length > 2) {
      for (let i = 2; i < arguments.length; i++) {
        args[i] = arguments[i]
      }
    }

    try {
      return super.emit.apply(this, args)
    } finally {
      if (!isEndish(ev))
        this[MAYBE_EMIT_END]()
      else
        this.removeAllListeners(ev)
    }
  }

  // const all = await stream.collect()
  collect () {
    const buf = []
    if (!this[OBJECTMODE])
      buf.dataLength = 0
    // set the promise first, in case an error is raised
    // by triggering the flow here.
    const p = this.promise()
    this.on('data', c => {
      buf.push(c)
      if (!this[OBJECTMODE])
        buf.dataLength += c.length
    })
    return p.then(() => buf)
  }

  // const data = await stream.concat()
  concat () {
    return this[OBJECTMODE]
      ? Promise.reject(new Error('cannot concat in objectMode'))
      : this.collect().then(buf =>
          this[OBJECTMODE]
            ? Promise.reject(new Error('cannot concat in objectMode'))
            : this[ENCODING] ? buf.join('') : Buffer.concat(buf, buf.dataLength))
  }

  // stream.promise().then(() => done, er => emitted error)
  promise () {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED, () => reject(new Error('stream destroyed')))
      this.on('end', () => resolve())
      this.on('error', er => reject(er))
    })
  }

  // for await (let chunk of stream)
  [ASYNCITERATOR] () {
    const next = () => {
      const res = this.read()
      if (res !== null)
        return Promise.resolve({ done: false, value: res })

      if (this[EOF])
        return Promise.resolve({ done: true })

      let resolve = null
      let reject = null
      const onerr = er => {
        this.removeListener('data', ondata)
        this.removeListener('end', onend)
        reject(er)
      }
      const ondata = value => {
        this.removeListener('error', onerr)
        this.removeListener('end', onend)
        this.pause()
        resolve({ value: value, done: !!this[EOF] })
      }
      const onend = () => {
        this.removeListener('error', onerr)
        this.removeListener('data', ondata)
        resolve({ done: true })
      }
      const ondestroy = () => onerr(new Error('stream destroyed'))
      return new Promise((res, rej) => {
        reject = rej
        resolve = res
        this.once(DESTROYED, ondestroy)
        this.once('error', onerr)
        this.once('end', onend)
        this.once('data', ondata)
      })
    }

    return { next }
  }

  // for (let chunk of stream)
  [ITERATOR] () {
    const next = () => {
      const value = this.read()
      const done = value === null
      return { value, done }
    }
    return { next }
  }

  destroy (er) {
    if (this[DESTROYED]) {
      if (er)
        this.emit('error', er)
      else
        this.emit(DESTROYED)
      return this
    }

    this[DESTROYED] = true

    // throw away all buffered data, it's never coming out
    this.buffer = new Yallist()
    this[BUFFERLENGTH] = 0

    if (typeof this.close === 'function' && !this[CLOSED])
      this.close()

    if (er)
      this.emit('error', er)
    else // if no error to emit, still reject pending promises
      this.emit(DESTROYED)

    return this
  }

  static isStream (s) {
    return !!s && (s instanceof Minipass || s instanceof Stream ||
      s instanceof EE && (
        typeof s.pipe === 'function' || // readable
        (typeof s.write === 'function' && typeof s.end === 'function') // writable
      ))
  }
}


/***/ }),

/***/ 6769:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Update with any zlib constants that are added or changed in the future.
// Node v6 didn't export this, so we just hard code the version and rely
// on all the other hard-coded values from zlib v4736.  When node v6
// support drops, we can just export the realZlibConstants object.
const realZlibConstants = __nccwpck_require__(8761).constants ||
  /* istanbul ignore next */ { ZLIB_VERNUM: 4736 }

module.exports = Object.freeze(Object.assign(Object.create(null), {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_VERSION_ERROR: -6,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  DEFLATE: 1,
  INFLATE: 2,
  GZIP: 3,
  GUNZIP: 4,
  DEFLATERAW: 5,
  INFLATERAW: 6,
  UNZIP: 7,
  BROTLI_DECODE: 8,
  BROTLI_ENCODE: 9,
  Z_MIN_WINDOWBITS: 8,
  Z_MAX_WINDOWBITS: 15,
  Z_DEFAULT_WINDOWBITS: 15,
  Z_MIN_CHUNK: 64,
  Z_MAX_CHUNK: Infinity,
  Z_DEFAULT_CHUNK: 16384,
  Z_MIN_MEMLEVEL: 1,
  Z_MAX_MEMLEVEL: 9,
  Z_DEFAULT_MEMLEVEL: 8,
  Z_MIN_LEVEL: -1,
  Z_MAX_LEVEL: 9,
  Z_DEFAULT_LEVEL: -1,
  BROTLI_OPERATION_PROCESS: 0,
  BROTLI_OPERATION_FLUSH: 1,
  BROTLI_OPERATION_FINISH: 2,
  BROTLI_OPERATION_EMIT_METADATA: 3,
  BROTLI_MODE_GENERIC: 0,
  BROTLI_MODE_TEXT: 1,
  BROTLI_MODE_FONT: 2,
  BROTLI_DEFAULT_MODE: 0,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 11,
  BROTLI_DEFAULT_QUALITY: 11,
  BROTLI_MIN_WINDOW_BITS: 10,
  BROTLI_MAX_WINDOW_BITS: 24,
  BROTLI_LARGE_MAX_WINDOW_BITS: 30,
  BROTLI_DEFAULT_WINDOW: 22,
  BROTLI_MIN_INPUT_BLOCK_BITS: 16,
  BROTLI_MAX_INPUT_BLOCK_BITS: 24,
  BROTLI_PARAM_MODE: 0,
  BROTLI_PARAM_QUALITY: 1,
  BROTLI_PARAM_LGWIN: 2,
  BROTLI_PARAM_LGBLOCK: 3,
  BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
  BROTLI_PARAM_SIZE_HINT: 5,
  BROTLI_PARAM_LARGE_WINDOW: 6,
  BROTLI_PARAM_NPOSTFIX: 7,
  BROTLI_PARAM_NDIRECT: 8,
  BROTLI_DECODER_RESULT_ERROR: 0,
  BROTLI_DECODER_RESULT_SUCCESS: 1,
  BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
  BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
  BROTLI_DECODER_NO_ERROR: 0,
  BROTLI_DECODER_SUCCESS: 1,
  BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
  BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
  BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
  BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
  BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
  BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
  BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
  BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
  BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
  BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
  BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
  BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
  BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
  BROTLI_DECODER_ERROR_UNREACHABLE: -31,
}, realZlibConstants))


/***/ }),

/***/ 3486:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


const assert = __nccwpck_require__(2357)
const Buffer = __nccwpck_require__(4293).Buffer
const realZlib = __nccwpck_require__(8761)

const constants = exports.constants = __nccwpck_require__(6769)
const Minipass = __nccwpck_require__(1077)

const OriginalBufferConcat = Buffer.concat

const _superWrite = Symbol('_superWrite')
class ZlibError extends Error {
  constructor (err) {
    super('zlib: ' + err.message)
    this.code = err.code
    this.errno = err.errno
    /* istanbul ignore if */
    if (!this.code)
      this.code = 'ZLIB_ERROR'

    this.message = 'zlib: ' + err.message
    Error.captureStackTrace(this, this.constructor)
  }

  get name () {
    return 'ZlibError'
  }
}

// the Zlib class they all inherit from
// This thing manages the queue of requests, and returns
// true or false if there is anything in the queue when
// you call the .write() method.
const _opts = Symbol('opts')
const _flushFlag = Symbol('flushFlag')
const _finishFlushFlag = Symbol('finishFlushFlag')
const _fullFlushFlag = Symbol('fullFlushFlag')
const _handle = Symbol('handle')
const _onError = Symbol('onError')
const _sawError = Symbol('sawError')
const _level = Symbol('level')
const _strategy = Symbol('strategy')
const _ended = Symbol('ended')
const _defaultFullFlush = Symbol('_defaultFullFlush')

class ZlibBase extends Minipass {
  constructor (opts, mode) {
    if (!opts || typeof opts !== 'object')
      throw new TypeError('invalid options for ZlibBase constructor')

    super(opts)
    this[_sawError] = false
    this[_ended] = false
    this[_opts] = opts

    this[_flushFlag] = opts.flush
    this[_finishFlushFlag] = opts.finishFlush
    // this will throw if any options are invalid for the class selected
    try {
      this[_handle] = new realZlib[mode](opts)
    } catch (er) {
      // make sure that all errors get decorated properly
      throw new ZlibError(er)
    }

    this[_onError] = (err) => {
      // no sense raising multiple errors, since we abort on the first one.
      if (this[_sawError])
        return

      this[_sawError] = true

      // there is no way to cleanly recover.
      // continuing only obscures problems.
      this.close()
      this.emit('error', err)
    }

    this[_handle].on('error', er => this[_onError](new ZlibError(er)))
    this.once('end', () => this.close)
  }

  close () {
    if (this[_handle]) {
      this[_handle].close()
      this[_handle] = null
      this.emit('close')
    }
  }

  reset () {
    if (!this[_sawError]) {
      assert(this[_handle], 'zlib binding closed')
      return this[_handle].reset()
    }
  }

  flush (flushFlag) {
    if (this.ended)
      return

    if (typeof flushFlag !== 'number')
      flushFlag = this[_fullFlushFlag]
    this.write(Object.assign(Buffer.alloc(0), { [_flushFlag]: flushFlag }))
  }

  end (chunk, encoding, cb) {
    if (chunk)
      this.write(chunk, encoding)
    this.flush(this[_finishFlushFlag])
    this[_ended] = true
    return super.end(null, null, cb)
  }

  get ended () {
    return this[_ended]
  }

  write (chunk, encoding, cb) {
    // process the chunk using the sync process
    // then super.write() all the outputted chunks
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'

    if (typeof chunk === 'string')
      chunk = Buffer.from(chunk, encoding)

    if (this[_sawError])
      return
    assert(this[_handle], 'zlib binding closed')

    // _processChunk tries to .close() the native handle after it's done, so we
    // intercept that by temporarily making it a no-op.
    const nativeHandle = this[_handle]._handle
    const originalNativeClose = nativeHandle.close
    nativeHandle.close = () => {}
    const originalClose = this[_handle].close
    this[_handle].close = () => {}
    // It also calls `Buffer.concat()` at the end, which may be convenient
    // for some, but which we are not interested in as it slows us down.
    Buffer.concat = (args) => args
    let result
    try {
      const flushFlag = typeof chunk[_flushFlag] === 'number'
        ? chunk[_flushFlag] : this[_flushFlag]
      result = this[_handle]._processChunk(chunk, flushFlag)
      // if we don't throw, reset it back how it was
      Buffer.concat = OriginalBufferConcat
    } catch (err) {
      // or if we do, put Buffer.concat() back before we emit error
      // Error events call into user code, which may call Buffer.concat()
      Buffer.concat = OriginalBufferConcat
      this[_onError](new ZlibError(err))
    } finally {
      if (this[_handle]) {
        // Core zlib resets `_handle` to null after attempting to close the
        // native handle. Our no-op handler prevented actual closure, but we
        // need to restore the `._handle` property.
        this[_handle]._handle = nativeHandle
        nativeHandle.close = originalNativeClose
        this[_handle].close = originalClose
        // `_processChunk()` adds an 'error' listener. If we don't remove it
        // after each call, these handlers start piling up.
        this[_handle].removeAllListeners('error')
        // make sure OUR error listener is still attached tho
      }
    }

    if (this[_handle])
      this[_handle].on('error', er => this[_onError](new ZlibError(er)))

    let writeReturn
    if (result) {
      if (Array.isArray(result) && result.length > 0) {
        // The first buffer is always `handle._outBuffer`, which would be
        // re-used for later invocations; so, we always have to copy that one.
        writeReturn = this[_superWrite](Buffer.from(result[0]))
        for (let i = 1; i < result.length; i++) {
          writeReturn = this[_superWrite](result[i])
        }
      } else {
        writeReturn = this[_superWrite](Buffer.from(result))
      }
    }

    if (cb)
      cb()
    return writeReturn
  }

  [_superWrite] (data) {
    return super.write(data)
  }
}

class Zlib extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {}

    opts.flush = opts.flush || constants.Z_NO_FLUSH
    opts.finishFlush = opts.finishFlush || constants.Z_FINISH
    super(opts, mode)

    this[_fullFlushFlag] = constants.Z_FULL_FLUSH
    this[_level] = opts.level
    this[_strategy] = opts.strategy
  }

  params (level, strategy) {
    if (this[_sawError])
      return

    if (!this[_handle])
      throw new Error('cannot switch params when binding is closed')

    // no way to test this without also not supporting params at all
    /* istanbul ignore if */
    if (!this[_handle].params)
      throw new Error('not supported in this implementation')

    if (this[_level] !== level || this[_strategy] !== strategy) {
      this.flush(constants.Z_SYNC_FLUSH)
      assert(this[_handle], 'zlib binding closed')
      // .params() calls .flush(), but the latter is always async in the
      // core zlib. We override .flush() temporarily to intercept that and
      // flush synchronously.
      const origFlush = this[_handle].flush
      this[_handle].flush = (flushFlag, cb) => {
        this.flush(flushFlag)
        cb()
      }
      try {
        this[_handle].params(level, strategy)
      } finally {
        this[_handle].flush = origFlush
      }
      /* istanbul ignore else */
      if (this[_handle]) {
        this[_level] = level
        this[_strategy] = strategy
      }
    }
  }
}

// minimal 2-byte header
class Deflate extends Zlib {
  constructor (opts) {
    super(opts, 'Deflate')
  }
}

class Inflate extends Zlib {
  constructor (opts) {
    super(opts, 'Inflate')
  }
}

// gzip - bigger header, same deflate compression
const _portable = Symbol('_portable')
class Gzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gzip')
    this[_portable] = opts && !!opts.portable
  }

  [_superWrite] (data) {
    if (!this[_portable])
      return super[_superWrite](data)

    // we'll always get the header emitted in one first chunk
    // overwrite the OS indicator byte with 0xFF
    this[_portable] = false
    data[9] = 255
    return super[_superWrite](data)
  }
}

class Gunzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gunzip')
  }
}

// raw - no header
class DeflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'DeflateRaw')
  }
}

class InflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'InflateRaw')
  }
}

// auto-detect header.
class Unzip extends Zlib {
  constructor (opts) {
    super(opts, 'Unzip')
  }
}

class Brotli extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {}

    opts.flush = opts.flush || constants.BROTLI_OPERATION_PROCESS
    opts.finishFlush = opts.finishFlush || constants.BROTLI_OPERATION_FINISH

    super(opts, mode)

    this[_fullFlushFlag] = constants.BROTLI_OPERATION_FLUSH
  }
}

class BrotliCompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliCompress')
  }
}

class BrotliDecompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliDecompress')
  }
}

exports.Deflate = Deflate
exports.Inflate = Inflate
exports.Gzip = Gzip
exports.Gunzip = Gunzip
exports.DeflateRaw = DeflateRaw
exports.InflateRaw = InflateRaw
exports.Unzip = Unzip
/* istanbul ignore else */
if (typeof realZlib.BrotliCompress === 'function') {
  exports.BrotliCompress = BrotliCompress
  exports.BrotliDecompress = BrotliDecompress
} else {
  exports.BrotliCompress = exports.BrotliDecompress = class {
    constructor () {
      throw new Error('Brotli is not supported in this version of Node.js')
    }
  }
}


/***/ }),

/***/ 6186:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const optsArg = __nccwpck_require__(2853)
const pathArg = __nccwpck_require__(2930)

const {mkdirpNative, mkdirpNativeSync} = __nccwpck_require__(4983)
const {mkdirpManual, mkdirpManualSync} = __nccwpck_require__(356)
const {useNative, useNativeSync} = __nccwpck_require__(4518)


const mkdirp = (path, opts) => {
  path = pathArg(path)
  opts = optsArg(opts)
  return useNative(opts)
    ? mkdirpNative(path, opts)
    : mkdirpManual(path, opts)
}

const mkdirpSync = (path, opts) => {
  path = pathArg(path)
  opts = optsArg(opts)
  return useNativeSync(opts)
    ? mkdirpNativeSync(path, opts)
    : mkdirpManualSync(path, opts)
}

mkdirp.sync = mkdirpSync
mkdirp.native = (path, opts) => mkdirpNative(pathArg(path), optsArg(opts))
mkdirp.manual = (path, opts) => mkdirpManual(pathArg(path), optsArg(opts))
mkdirp.nativeSync = (path, opts) => mkdirpNativeSync(pathArg(path), optsArg(opts))
mkdirp.manualSync = (path, opts) => mkdirpManualSync(pathArg(path), optsArg(opts))

module.exports = mkdirp


/***/ }),

/***/ 4992:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {dirname} = __nccwpck_require__(5622)

const findMade = (opts, parent, path = undefined) => {
  // we never want the 'made' return value to be a root directory
  if (path === parent)
    return Promise.resolve()

  return opts.statAsync(parent).then(
    st => st.isDirectory() ? path : undefined, // will fail later
    er => er.code === 'ENOENT'
      ? findMade(opts, dirname(parent), parent)
      : undefined
  )
}

const findMadeSync = (opts, parent, path = undefined) => {
  if (path === parent)
    return undefined

  try {
    return opts.statSync(parent).isDirectory() ? path : undefined
  } catch (er) {
    return er.code === 'ENOENT'
      ? findMadeSync(opts, dirname(parent), parent)
      : undefined
  }
}

module.exports = {findMade, findMadeSync}


/***/ }),

/***/ 356:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {dirname} = __nccwpck_require__(5622)

const mkdirpManual = (path, opts, made) => {
  opts.recursive = false
  const parent = dirname(path)
  if (parent === path) {
    return opts.mkdirAsync(path, opts).catch(er => {
      // swallowed by recursive implementation on posix systems
      // any other error is a failure
      if (er.code !== 'EISDIR')
        throw er
    })
  }

  return opts.mkdirAsync(path, opts).then(() => made || path, er => {
    if (er.code === 'ENOENT')
      return mkdirpManual(parent, opts)
        .then(made => mkdirpManual(path, opts, made))
    if (er.code !== 'EEXIST' && er.code !== 'EROFS')
      throw er
    return opts.statAsync(path).then(st => {
      if (st.isDirectory())
        return made
      else
        throw er
    }, () => { throw er })
  })
}

const mkdirpManualSync = (path, opts, made) => {
  const parent = dirname(path)
  opts.recursive = false

  if (parent === path) {
    try {
      return opts.mkdirSync(path, opts)
    } catch (er) {
      // swallowed by recursive implementation on posix systems
      // any other error is a failure
      if (er.code !== 'EISDIR')
        throw er
      else
        return
    }
  }

  try {
    opts.mkdirSync(path, opts)
    return made || path
  } catch (er) {
    if (er.code === 'ENOENT')
      return mkdirpManualSync(path, opts, mkdirpManualSync(parent, opts, made))
    if (er.code !== 'EEXIST' && er.code !== 'EROFS')
      throw er
    try {
      if (!opts.statSync(path).isDirectory())
        throw er
    } catch (_) {
      throw er
    }
  }
}

module.exports = {mkdirpManual, mkdirpManualSync}


/***/ }),

/***/ 4983:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const {dirname} = __nccwpck_require__(5622)
const {findMade, findMadeSync} = __nccwpck_require__(4992)
const {mkdirpManual, mkdirpManualSync} = __nccwpck_require__(356)

const mkdirpNative = (path, opts) => {
  opts.recursive = true
  const parent = dirname(path)
  if (parent === path)
    return opts.mkdirAsync(path, opts)

  return findMade(opts, path).then(made =>
    opts.mkdirAsync(path, opts).then(() => made)
    .catch(er => {
      if (er.code === 'ENOENT')
        return mkdirpManual(path, opts)
      else
        throw er
    }))
}

const mkdirpNativeSync = (path, opts) => {
  opts.recursive = true
  const parent = dirname(path)
  if (parent === path)
    return opts.mkdirSync(path, opts)

  const made = findMadeSync(opts, path)
  try {
    opts.mkdirSync(path, opts)
    return made
  } catch (er) {
    if (er.code === 'ENOENT')
      return mkdirpManualSync(path, opts)
    else
      throw er
  }
}

module.exports = {mkdirpNative, mkdirpNativeSync}


/***/ }),

/***/ 2853:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { promisify } = __nccwpck_require__(1669)
const fs = __nccwpck_require__(5747)
const optsArg = opts => {
  if (!opts)
    opts = { mode: 0o777, fs }
  else if (typeof opts === 'object')
    opts = { mode: 0o777, fs, ...opts }
  else if (typeof opts === 'number')
    opts = { mode: opts, fs }
  else if (typeof opts === 'string')
    opts = { mode: parseInt(opts, 8), fs }
  else
    throw new TypeError('invalid options argument')

  opts.mkdir = opts.mkdir || opts.fs.mkdir || fs.mkdir
  opts.mkdirAsync = promisify(opts.mkdir)
  opts.stat = opts.stat || opts.fs.stat || fs.stat
  opts.statAsync = promisify(opts.stat)
  opts.statSync = opts.statSync || opts.fs.statSync || fs.statSync
  opts.mkdirSync = opts.mkdirSync || opts.fs.mkdirSync || fs.mkdirSync
  return opts
}
module.exports = optsArg


/***/ }),

/***/ 2930:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const platform = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform
const { resolve, parse } = __nccwpck_require__(5622)
const pathArg = path => {
  if (/\0/.test(path)) {
    // simulate same failure that node raises
    throw Object.assign(
      new TypeError('path must be a string without null bytes'),
      {
        path,
        code: 'ERR_INVALID_ARG_VALUE',
      }
    )
  }

  path = resolve(path)
  if (platform === 'win32') {
    const badWinChars = /[*|"<>?:]/
    const {root} = parse(path)
    if (badWinChars.test(path.substr(root.length))) {
      throw Object.assign(new Error('Illegal characters in path.'), {
        path,
        code: 'EINVAL',
      })
    }
  }

  return path
}
module.exports = pathArg


/***/ }),

/***/ 4518:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(5747)

const version = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version
const versArr = version.replace(/^v/, '').split('.')
const hasNative = +versArr[0] > 10 || +versArr[0] === 10 && +versArr[1] >= 12

const useNative = !hasNative ? () => false : opts => opts.mkdir === fs.mkdir
const useNativeSync = !hasNative ? () => false : opts => opts.mkdirSync === fs.mkdirSync

module.exports = {useNative, useNativeSync}


/***/ }),

/***/ 900:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 9318:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const os = __nccwpck_require__(2087);
const hasFlag = __nccwpck_require__(1621);

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ 4674:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";
var __webpack_unused_export__;


// high-level commands
__webpack_unused_export__ = /* unused reexport */ __nccwpck_require__(4016)
__webpack_unused_export__ = /* unused reexport */ __nccwpck_require__(5923)
__webpack_unused_export__ = /* unused reexport */ __nccwpck_require__(1525)
__webpack_unused_export__ = /* unused reexport */ __nccwpck_require__(4404)
exports.x = /* unused reexport */ __nccwpck_require__(5317)

// classes
/* unused reexport */ __nccwpck_require__(7900)
/* unused reexport */ __nccwpck_require__(7628)
/* unused reexport */ __nccwpck_require__(8917)
/* unused reexport */ __nccwpck_require__(8116)
/* unused reexport */ __nccwpck_require__(5450)
/* unused reexport */ __nccwpck_require__(6043)
/* unused reexport */ __nccwpck_require__(7996)
/* unused reexport */ __nccwpck_require__(4173)


/***/ }),

/***/ 4016:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// tar -c
const hlo = __nccwpck_require__(5274)

const Pack = __nccwpck_require__(7900)
const fsm = __nccwpck_require__(7714)
const t = __nccwpck_require__(1525)
const path = __nccwpck_require__(5622)

module.exports = (opt_, files, cb) => {
  if (typeof files === 'function')
    cb = files

  if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  return opt.file && opt.sync ? createFileSync(opt, files)
    : opt.file ? createFile(opt, files, cb)
    : opt.sync ? createSync(opt, files)
    : create(opt, files)
}

const createFileSync = (opt, files) => {
  const p = new Pack.Sync(opt)
  const stream = new fsm.WriteStreamSync(opt.file, {
    mode: opt.mode || 0o666,
  })
  p.pipe(stream)
  addFilesSync(p, files)
}

const createFile = (opt, files, cb) => {
  const p = new Pack(opt)
  const stream = new fsm.WriteStream(opt.file, {
    mode: opt.mode || 0o666,
  })
  p.pipe(stream)

  const promise = new Promise((res, rej) => {
    stream.on('error', rej)
    stream.on('close', res)
    p.on('error', rej)
  })

  addFilesAsync(p, files)

  return cb ? promise.then(cb, cb) : promise
}

const addFilesSync = (p, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '@') {
      t({
        file: path.resolve(p.cwd, file.substr(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry),
      })
    } else
      p.add(file)
  })
  p.end()
}

const addFilesAsync = (p, files) => {
  while (files.length) {
    const file = files.shift()
    if (file.charAt(0) === '@') {
      return t({
        file: path.resolve(p.cwd, file.substr(1)),
        noResume: true,
        onentry: entry => p.add(entry),
      }).then(_ => addFilesAsync(p, files))
    } else
      p.add(file)
  }
  p.end()
}

const createSync = (opt, files) => {
  const p = new Pack.Sync(opt)
  addFilesSync(p, files)
  return p
}

const create = (opt, files) => {
  const p = new Pack(opt)
  addFilesAsync(p, files)
  return p
}


/***/ }),

/***/ 5317:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// tar -x
const hlo = __nccwpck_require__(5274)
const Unpack = __nccwpck_require__(7628)
const fs = __nccwpck_require__(5747)
const fsm = __nccwpck_require__(7714)
const path = __nccwpck_require__(5622)

module.exports = (opt_, files, cb) => {
  if (typeof opt_ === 'function')
    cb = opt_, files = null, opt_ = {}
  else if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (typeof files === 'function')
    cb = files, files = null

  if (!files)
    files = []
  else
    files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  if (files.length)
    filesFilter(opt, files)

  return opt.file && opt.sync ? extractFileSync(opt)
    : opt.file ? extractFile(opt, cb)
    : opt.sync ? extractSync(opt)
    : extract(opt)
}

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter = (opt, files) => {
  const map = new Map(files.map(f => [f.replace(/\/+$/, ''), true]))
  const filter = opt.filter

  const mapHas = (file, r) => {
    const root = r || path.parse(file).root || '.'
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path.dirname(file), root)

    map.set(file, ret)
    return ret
  }

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(file.replace(/\/+$/, ''))
    : file => mapHas(file.replace(/\/+$/, ''))
}

const extractFileSync = opt => {
  const u = new Unpack.Sync(opt)

  const file = opt.file
  const stat = fs.statSync(file)
  // This trades a zero-byte read() syscall for a stat
  // However, it will usually result in less memory allocation
  const readSize = opt.maxReadSize || 16 * 1024 * 1024
  const stream = new fsm.ReadStreamSync(file, {
    readSize: readSize,
    size: stat.size,
  })
  stream.pipe(u)
}

const extractFile = (opt, cb) => {
  const u = new Unpack(opt)
  const readSize = opt.maxReadSize || 16 * 1024 * 1024

  const file = opt.file
  const p = new Promise((resolve, reject) => {
    u.on('error', reject)
    u.on('close', resolve)

    // This trades a zero-byte read() syscall for a stat
    // However, it will usually result in less memory allocation
    fs.stat(file, (er, stat) => {
      if (er)
        reject(er)
      else {
        const stream = new fsm.ReadStream(file, {
          readSize: readSize,
          size: stat.size,
        })
        stream.on('error', reject)
        stream.pipe(u)
      }
    })
  })
  return cb ? p.then(cb, cb) : p
}

const extractSync = opt => new Unpack.Sync(opt)

const extract = opt => new Unpack(opt)


/***/ }),

/***/ 1172:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Get the appropriate flag to use for creating files
// We use fmap on Windows platforms for files less than
// 512kb.  This is a fairly low limit, but avoids making
// things slower in some cases.  Since most of what this
// library is used for is extracting tarballs of many
// relatively small files in npm packages and the like,
// it can be a big boost on Windows platforms.
// Only supported in Node v12.9.0 and above.
const platform = process.env.__FAKE_PLATFORM__ || process.platform
const isWindows = platform === 'win32'
const fs = global.__FAKE_TESTING_FS__ || __nccwpck_require__(5747)

/* istanbul ignore next */
const { O_CREAT, O_TRUNC, O_WRONLY, UV_FS_O_FILEMAP = 0 } = fs.constants

const fMapEnabled = isWindows && !!UV_FS_O_FILEMAP
const fMapLimit = 512 * 1024
const fMapFlag = UV_FS_O_FILEMAP | O_TRUNC | O_CREAT | O_WRONLY
module.exports = !fMapEnabled ? () => 'w'
  : size => size < fMapLimit ? fMapFlag : 'w'


/***/ }),

/***/ 6043:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

// parse a 512-byte header block to a data object, or vice-versa
// encode returns `true` if a pax extended header is needed, because
// the data could not be faithfully encoded in a simple header.
// (Also, check header.needPax to see if it needs a pax header.)

const types = __nccwpck_require__(4173)
const pathModule = __nccwpck_require__(5622).posix
const large = __nccwpck_require__(2370)

const SLURP = Symbol('slurp')
const TYPE = Symbol('type')

class Header {
  constructor (data, off, ex, gex) {
    this.cksumValid = false
    this.needPax = false
    this.nullBlock = false

    this.block = null
    this.path = null
    this.mode = null
    this.uid = null
    this.gid = null
    this.size = null
    this.mtime = null
    this.cksum = null
    this[TYPE] = '0'
    this.linkpath = null
    this.uname = null
    this.gname = null
    this.devmaj = 0
    this.devmin = 0
    this.atime = null
    this.ctime = null

    if (Buffer.isBuffer(data))
      this.decode(data, off || 0, ex, gex)
    else if (data)
      this.set(data)
  }

  decode (buf, off, ex, gex) {
    if (!off)
      off = 0

    if (!buf || !(buf.length >= off + 512))
      throw new Error('need 512 bytes for header')

    this.path = decString(buf, off, 100)
    this.mode = decNumber(buf, off + 100, 8)
    this.uid = decNumber(buf, off + 108, 8)
    this.gid = decNumber(buf, off + 116, 8)
    this.size = decNumber(buf, off + 124, 12)
    this.mtime = decDate(buf, off + 136, 12)
    this.cksum = decNumber(buf, off + 148, 12)

    // if we have extended or global extended headers, apply them now
    // See https://github.com/npm/node-tar/pull/187
    this[SLURP](ex)
    this[SLURP](gex, true)

    // old tar versions marked dirs as a file with a trailing /
    this[TYPE] = decString(buf, off + 156, 1)
    if (this[TYPE] === '')
      this[TYPE] = '0'
    if (this[TYPE] === '0' && this.path.substr(-1) === '/')
      this[TYPE] = '5'

    // tar implementations sometimes incorrectly put the stat(dir).size
    // as the size in the tarball, even though Directory entries are
    // not able to have any body at all.  In the very rare chance that
    // it actually DOES have a body, we weren't going to do anything with
    // it anyway, and it'll just be a warning about an invalid header.
    if (this[TYPE] === '5')
      this.size = 0

    this.linkpath = decString(buf, off + 157, 100)
    if (buf.slice(off + 257, off + 265).toString() === 'ustar\u000000') {
      this.uname = decString(buf, off + 265, 32)
      this.gname = decString(buf, off + 297, 32)
      this.devmaj = decNumber(buf, off + 329, 8)
      this.devmin = decNumber(buf, off + 337, 8)
      if (buf[off + 475] !== 0) {
        // definitely a prefix, definitely >130 chars.
        const prefix = decString(buf, off + 345, 155)
        this.path = prefix + '/' + this.path
      } else {
        const prefix = decString(buf, off + 345, 130)
        if (prefix)
          this.path = prefix + '/' + this.path
        this.atime = decDate(buf, off + 476, 12)
        this.ctime = decDate(buf, off + 488, 12)
      }
    }

    let sum = 8 * 0x20
    for (let i = off; i < off + 148; i++)
      sum += buf[i]

    for (let i = off + 156; i < off + 512; i++)
      sum += buf[i]

    this.cksumValid = sum === this.cksum
    if (this.cksum === null && sum === 8 * 0x20)
      this.nullBlock = true
  }

  [SLURP] (ex, global) {
    for (const k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path'))
        this[k] = ex[k]
    }
  }

  encode (buf, off) {
    if (!buf) {
      buf = this.block = Buffer.alloc(512)
      off = 0
    }

    if (!off)
      off = 0

    if (!(buf.length >= off + 512))
      throw new Error('need 512 bytes for header')

    const prefixSize = this.ctime || this.atime ? 130 : 155
    const split = splitPrefix(this.path || '', prefixSize)
    const path = split[0]
    const prefix = split[1]
    this.needPax = split[2]

    this.needPax = encString(buf, off, 100, path) || this.needPax
    this.needPax = encNumber(buf, off + 100, 8, this.mode) || this.needPax
    this.needPax = encNumber(buf, off + 108, 8, this.uid) || this.needPax
    this.needPax = encNumber(buf, off + 116, 8, this.gid) || this.needPax
    this.needPax = encNumber(buf, off + 124, 12, this.size) || this.needPax
    this.needPax = encDate(buf, off + 136, 12, this.mtime) || this.needPax
    buf[off + 156] = this[TYPE].charCodeAt(0)
    this.needPax = encString(buf, off + 157, 100, this.linkpath) || this.needPax
    buf.write('ustar\u000000', off + 257, 8)
    this.needPax = encString(buf, off + 265, 32, this.uname) || this.needPax
    this.needPax = encString(buf, off + 297, 32, this.gname) || this.needPax
    this.needPax = encNumber(buf, off + 329, 8, this.devmaj) || this.needPax
    this.needPax = encNumber(buf, off + 337, 8, this.devmin) || this.needPax
    this.needPax = encString(buf, off + 345, prefixSize, prefix) || this.needPax
    if (buf[off + 475] !== 0)
      this.needPax = encString(buf, off + 345, 155, prefix) || this.needPax
    else {
      this.needPax = encString(buf, off + 345, 130, prefix) || this.needPax
      this.needPax = encDate(buf, off + 476, 12, this.atime) || this.needPax
      this.needPax = encDate(buf, off + 488, 12, this.ctime) || this.needPax
    }

    let sum = 8 * 0x20
    for (let i = off; i < off + 148; i++)
      sum += buf[i]

    for (let i = off + 156; i < off + 512; i++)
      sum += buf[i]

    this.cksum = sum
    encNumber(buf, off + 148, 8, this.cksum)
    this.cksumValid = true

    return this.needPax
  }

  set (data) {
    for (const i in data) {
      if (data[i] !== null && data[i] !== undefined)
        this[i] = data[i]
    }
  }

  get type () {
    return types.name.get(this[TYPE]) || this[TYPE]
  }

  get typeKey () {
    return this[TYPE]
  }

  set type (type) {
    if (types.code.has(type))
      this[TYPE] = types.code.get(type)
    else
      this[TYPE] = type
  }
}

const splitPrefix = (p, prefixSize) => {
  const pathSize = 100
  let pp = p
  let prefix = ''
  let ret
  const root = pathModule.parse(p).root || '.'

  if (Buffer.byteLength(pp) < pathSize)
    ret = [pp, prefix, false]
  else {
    // first set prefix to the dir, and path to the base
    prefix = pathModule.dirname(pp)
    pp = pathModule.basename(pp)

    do {
      // both fit!
      if (Buffer.byteLength(pp) <= pathSize &&
          Buffer.byteLength(prefix) <= prefixSize)
        ret = [pp, prefix, false]

      // prefix fits in prefix, but path doesn't fit in path
      else if (Buffer.byteLength(pp) > pathSize &&
          Buffer.byteLength(prefix) <= prefixSize)
        ret = [pp.substr(0, pathSize - 1), prefix, true]

      else {
        // make path take a bit from prefix
        pp = pathModule.join(pathModule.basename(prefix), pp)
        prefix = pathModule.dirname(prefix)
      }
    } while (prefix !== root && !ret)

    // at this point, found no resolution, just truncate
    if (!ret)
      ret = [p.substr(0, pathSize - 1), '', true]
  }
  return ret
}

const decString = (buf, off, size) =>
  buf.slice(off, off + size).toString('utf8').replace(/\0.*/, '')

const decDate = (buf, off, size) =>
  numToDate(decNumber(buf, off, size))

const numToDate = num => num === null ? null : new Date(num * 1000)

const decNumber = (buf, off, size) =>
  buf[off] & 0x80 ? large.parse(buf.slice(off, off + size))
  : decSmallNumber(buf, off, size)

const nanNull = value => isNaN(value) ? null : value

const decSmallNumber = (buf, off, size) =>
  nanNull(parseInt(
    buf.slice(off, off + size)
      .toString('utf8').replace(/\0.*$/, '').trim(), 8))

// the maximum encodable as a null-terminated octal, by field size
const MAXNUM = {
  12: 0o77777777777,
  8: 0o7777777,
}

const encNumber = (buf, off, size, number) =>
  number === null ? false :
  number > MAXNUM[size] || number < 0
    ? (large.encode(number, buf.slice(off, off + size)), true)
    : (encSmallNumber(buf, off, size, number), false)

const encSmallNumber = (buf, off, size, number) =>
  buf.write(octalString(number, size), off, size, 'ascii')

const octalString = (number, size) =>
  padOctal(Math.floor(number).toString(8), size)

const padOctal = (string, size) =>
  (string.length === size - 1 ? string
  : new Array(size - string.length - 1).join('0') + string + ' ') + '\0'

const encDate = (buf, off, size, date) =>
  date === null ? false :
  encNumber(buf, off, size, date.getTime() / 1000)

// enough to fill the longest string we've got
const NULLS = new Array(156).join('\0')
// pad with nulls, return true if it's longer or non-ascii
const encString = (buf, off, size, string) =>
  string === null ? false :
  (buf.write(string + NULLS, off, size, 'utf8'),
  string.length !== Buffer.byteLength(string) || string.length > size)

module.exports = Header


/***/ }),

/***/ 5274:
/***/ ((module) => {

"use strict";


// turn tar(1) style args like `C` into the more verbose things like `cwd`

const argmap = new Map([
  ['C', 'cwd'],
  ['f', 'file'],
  ['z', 'gzip'],
  ['P', 'preservePaths'],
  ['U', 'unlink'],
  ['strip-components', 'strip'],
  ['stripComponents', 'strip'],
  ['keep-newer', 'newer'],
  ['keepNewer', 'newer'],
  ['keep-newer-files', 'newer'],
  ['keepNewerFiles', 'newer'],
  ['k', 'keep'],
  ['keep-existing', 'keep'],
  ['keepExisting', 'keep'],
  ['m', 'noMtime'],
  ['no-mtime', 'noMtime'],
  ['p', 'preserveOwner'],
  ['L', 'follow'],
  ['h', 'follow'],
])

module.exports = opt => opt ? Object.keys(opt).map(k => [
  argmap.has(k) ? argmap.get(k) : k, opt[k],
]).reduce((set, kv) => (set[kv[0]] = kv[1], set), Object.create(null)) : {}


/***/ }),

/***/ 2370:
/***/ ((module) => {

"use strict";

// Tar can encode large and negative numbers using a leading byte of
// 0xff for negative, and 0x80 for positive.

const encode = (num, buf) => {
  if (!Number.isSafeInteger(num))
    // The number is so large that javascript cannot represent it with integer
    // precision.
    throw Error('cannot encode number outside of javascript safe integer range')
  else if (num < 0)
    encodeNegative(num, buf)
  else
    encodePositive(num, buf)
  return buf
}

const encodePositive = (num, buf) => {
  buf[0] = 0x80

  for (var i = buf.length; i > 1; i--) {
    buf[i - 1] = num & 0xff
    num = Math.floor(num / 0x100)
  }
}

const encodeNegative = (num, buf) => {
  buf[0] = 0xff
  var flipped = false
  num = num * -1
  for (var i = buf.length; i > 1; i--) {
    var byte = num & 0xff
    num = Math.floor(num / 0x100)
    if (flipped)
      buf[i - 1] = onesComp(byte)
    else if (byte === 0)
      buf[i - 1] = 0
    else {
      flipped = true
      buf[i - 1] = twosComp(byte)
    }
  }
}

const parse = (buf) => {
  const pre = buf[0]
  const value = pre === 0x80 ? pos(buf.slice(1, buf.length))
    : pre === 0xff ? twos(buf)
    : null
  if (value === null)
    throw Error('invalid base256 encoding')

  if (!Number.isSafeInteger(value))
    // The number is so large that javascript cannot represent it with integer
    // precision.
    throw Error('parsed number outside of javascript safe integer range')

  return value
}

const twos = (buf) => {
  var len = buf.length
  var sum = 0
  var flipped = false
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i]
    var f
    if (flipped)
      f = onesComp(byte)
    else if (byte === 0)
      f = byte
    else {
      flipped = true
      f = twosComp(byte)
    }
    if (f !== 0)
      sum -= f * Math.pow(256, len - i - 1)
  }
  return sum
}

const pos = (buf) => {
  var len = buf.length
  var sum = 0
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i]
    if (byte !== 0)
      sum += byte * Math.pow(256, len - i - 1)
  }
  return sum
}

const onesComp = byte => (0xff ^ byte) & 0xff

const twosComp = byte => ((0xff ^ byte) + 1) & 0xff

module.exports = {
  encode,
  parse,
}


/***/ }),

/***/ 1525:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// XXX: This shares a lot in common with extract.js
// maybe some DRY opportunity here?

// tar -t
const hlo = __nccwpck_require__(5274)
const Parser = __nccwpck_require__(8917)
const fs = __nccwpck_require__(5747)
const fsm = __nccwpck_require__(7714)
const path = __nccwpck_require__(5622)

module.exports = (opt_, files, cb) => {
  if (typeof opt_ === 'function')
    cb = opt_, files = null, opt_ = {}
  else if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (typeof files === 'function')
    cb = files, files = null

  if (!files)
    files = []
  else
    files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  if (files.length)
    filesFilter(opt, files)

  if (!opt.noResume)
    onentryFunction(opt)

  return opt.file && opt.sync ? listFileSync(opt)
    : opt.file ? listFile(opt, cb)
    : list(opt)
}

const onentryFunction = opt => {
  const onentry = opt.onentry
  opt.onentry = onentry ? e => {
    onentry(e)
    e.resume()
  } : e => e.resume()
}

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter = (opt, files) => {
  const map = new Map(files.map(f => [f.replace(/\/+$/, ''), true]))
  const filter = opt.filter

  const mapHas = (file, r) => {
    const root = r || path.parse(file).root || '.'
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path.dirname(file), root)

    map.set(file, ret)
    return ret
  }

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(file.replace(/\/+$/, ''))
    : file => mapHas(file.replace(/\/+$/, ''))
}

const listFileSync = opt => {
  const p = list(opt)
  const file = opt.file
  let threw = true
  let fd
  try {
    const stat = fs.statSync(file)
    const readSize = opt.maxReadSize || 16 * 1024 * 1024
    if (stat.size < readSize)
      p.end(fs.readFileSync(file))
    else {
      let pos = 0
      const buf = Buffer.allocUnsafe(readSize)
      fd = fs.openSync(file, 'r')
      while (pos < stat.size) {
        const bytesRead = fs.readSync(fd, buf, 0, readSize, pos)
        pos += bytesRead
        p.write(buf.slice(0, bytesRead))
      }
      p.end()
    }
    threw = false
  } finally {
    if (threw && fd) {
      try {
        fs.closeSync(fd)
      } catch (er) {}
    }
  }
}

const listFile = (opt, cb) => {
  const parse = new Parser(opt)
  const readSize = opt.maxReadSize || 16 * 1024 * 1024

  const file = opt.file
  const p = new Promise((resolve, reject) => {
    parse.on('error', reject)
    parse.on('end', resolve)

    fs.stat(file, (er, stat) => {
      if (er)
        reject(er)
      else {
        const stream = new fsm.ReadStream(file, {
          readSize: readSize,
          size: stat.size,
        })
        stream.on('error', reject)
        stream.pipe(parse)
      }
    })
  })
  return cb ? p.then(cb, cb) : p
}

const list = opt => new Parser(opt)


/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

// wrapper around mkdirp for tar's needs.

// TODO: This should probably be a class, not functionally
// passing around state in a gazillion args.

const mkdirp = __nccwpck_require__(6186)
const fs = __nccwpck_require__(5747)
const path = __nccwpck_require__(5622)
const chownr = __nccwpck_require__(9051)

class SymlinkError extends Error {
  constructor (symlink, path) {
    super('Cannot extract through symbolic link')
    this.path = path
    this.symlink = symlink
  }

  get name () {
    return 'SylinkError'
  }
}

class CwdError extends Error {
  constructor (path, code) {
    super(code + ': Cannot cd into \'' + path + '\'')
    this.path = path
    this.code = code
  }

  get name () {
    return 'CwdError'
  }
}

module.exports = (dir, opt, cb) => {
  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask
  const mode = opt.mode | 0o0700
  const needChmod = (mode & umask) !== 0

  const uid = opt.uid
  const gid = opt.gid
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    (uid !== opt.processUid || gid !== opt.processGid)

  const preserve = opt.preserve
  const unlink = opt.unlink
  const cache = opt.cache
  const cwd = opt.cwd

  const done = (er, created) => {
    if (er)
      cb(er)
    else {
      cache.set(dir, true)
      if (created && doChown)
        chownr(created, uid, gid, er => done(er))
      else if (needChmod)
        fs.chmod(dir, mode, cb)
      else
        cb()
    }
  }

  if (cache && cache.get(dir) === true)
    return done()

  if (dir === cwd) {
    return fs.stat(dir, (er, st) => {
      if (er || !st.isDirectory())
        er = new CwdError(dir, er && er.code || 'ENOTDIR')
      done(er)
    })
  }

  if (preserve)
    return mkdirp(dir, {mode}).then(made => done(null, made), done)

  const sub = path.relative(cwd, dir)
  const parts = sub.split(/\/|\\/)
  mkdir_(cwd, parts, mode, cache, unlink, cwd, null, done)
}

const mkdir_ = (base, parts, mode, cache, unlink, cwd, created, cb) => {
  if (!parts.length)
    return cb(null, created)
  const p = parts.shift()
  const part = base + '/' + p
  if (cache.get(part))
    return mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
  fs.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb))
}

const onmkdir = (part, parts, mode, cache, unlink, cwd, created, cb) => er => {
  if (er) {
    if (er.path && path.dirname(er.path) === cwd &&
        (er.code === 'ENOTDIR' || er.code === 'ENOENT'))
      return cb(new CwdError(cwd, er.code))

    fs.lstat(part, (statEr, st) => {
      if (statEr)
        cb(statEr)
      else if (st.isDirectory())
        mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
      else if (unlink) {
        fs.unlink(part, er => {
          if (er)
            return cb(er)
          fs.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb))
        })
      } else if (st.isSymbolicLink())
        return cb(new SymlinkError(part, part + '/' + parts.join('/')))
      else
        cb(er)
    })
  } else {
    created = created || part
    mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
  }
}

module.exports.sync = (dir, opt) => {
  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask
  const mode = opt.mode | 0o0700
  const needChmod = (mode & umask) !== 0

  const uid = opt.uid
  const gid = opt.gid
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    (uid !== opt.processUid || gid !== opt.processGid)

  const preserve = opt.preserve
  const unlink = opt.unlink
  const cache = opt.cache
  const cwd = opt.cwd

  const done = (created) => {
    cache.set(dir, true)
    if (created && doChown)
      chownr.sync(created, uid, gid)
    if (needChmod)
      fs.chmodSync(dir, mode)
  }

  if (cache && cache.get(dir) === true)
    return done()

  if (dir === cwd) {
    let ok = false
    let code = 'ENOTDIR'
    try {
      ok = fs.statSync(dir).isDirectory()
    } catch (er) {
      code = er.code
    } finally {
      if (!ok)
        throw new CwdError(dir, code)
    }
    done()
    return
  }

  if (preserve)
    return done(mkdirp.sync(dir, mode))

  const sub = path.relative(cwd, dir)
  const parts = sub.split(/\/|\\/)
  let created = null
  for (let p = parts.shift(), part = cwd;
    p && (part += '/' + p);
    p = parts.shift()) {
    if (cache.get(part))
      continue

    try {
      fs.mkdirSync(part, mode)
      created = created || part
      cache.set(part, true)
    } catch (er) {
      if (er.path && path.dirname(er.path) === cwd &&
          (er.code === 'ENOTDIR' || er.code === 'ENOENT'))
        return new CwdError(cwd, er.code)

      const st = fs.lstatSync(part)
      if (st.isDirectory()) {
        cache.set(part, true)
        continue
      } else if (unlink) {
        fs.unlinkSync(part)
        fs.mkdirSync(part, mode)
        created = created || part
        cache.set(part, true)
        continue
      } else if (st.isSymbolicLink())
        return new SymlinkError(part, part + '/' + parts.join('/'))
    }
  }

  return done(created)
}


/***/ }),

/***/ 8371:
/***/ ((module) => {

"use strict";

module.exports = (mode, isDir, portable) => {
  mode &= 0o7777

  // in portable mode, use the minimum reasonable umask
  // if this system creates files with 0o664 by default
  // (as some linux distros do), then we'll write the
  // archive with 0o644 instead.  Also, don't ever create
  // a file that is not readable/writable by the owner.
  if (portable)
    mode = (mode | 0o600) & ~0o22

  // if dirs are readable, then they should be listable
  if (isDir) {
    if (mode & 0o400)
      mode |= 0o100
    if (mode & 0o40)
      mode |= 0o10
    if (mode & 0o4)
      mode |= 0o1
  }
  return mode
}


/***/ }),

/***/ 7900:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// A readable tar stream creator
// Technically, this is a transform stream that you write paths into,
// and tar format comes out of.
// The `add()` method is like `write()` but returns this,
// and end() return `this` as well, so you can
// do `new Pack(opt).add('files').add('dir').end().pipe(output)
// You could also do something like:
// streamOfPaths().pipe(new Pack()).pipe(new fs.WriteStream('out.tar'))

class PackJob {
  constructor (path, absolute) {
    this.path = path || './'
    this.absolute = absolute
    this.entry = null
    this.stat = null
    this.readdir = null
    this.pending = false
    this.ignore = false
    this.piped = false
  }
}

const MiniPass = __nccwpck_require__(1077)
const zlib = __nccwpck_require__(3486)
const ReadEntry = __nccwpck_require__(8116)
const WriteEntry = __nccwpck_require__(5450)
const WriteEntrySync = WriteEntry.Sync
const WriteEntryTar = WriteEntry.Tar
const Yallist = __nccwpck_require__(665)
const EOF = Buffer.alloc(1024)
const ONSTAT = Symbol('onStat')
const ENDED = Symbol('ended')
const QUEUE = Symbol('queue')
const CURRENT = Symbol('current')
const PROCESS = Symbol('process')
const PROCESSING = Symbol('processing')
const PROCESSJOB = Symbol('processJob')
const JOBS = Symbol('jobs')
const JOBDONE = Symbol('jobDone')
const ADDFSENTRY = Symbol('addFSEntry')
const ADDTARENTRY = Symbol('addTarEntry')
const STAT = Symbol('stat')
const READDIR = Symbol('readdir')
const ONREADDIR = Symbol('onreaddir')
const PIPE = Symbol('pipe')
const ENTRY = Symbol('entry')
const ENTRYOPT = Symbol('entryOpt')
const WRITEENTRYCLASS = Symbol('writeEntryClass')
const WRITE = Symbol('write')
const ONDRAIN = Symbol('ondrain')

const fs = __nccwpck_require__(5747)
const path = __nccwpck_require__(5622)
const warner = __nccwpck_require__(5899)

const Pack = warner(class Pack extends MiniPass {
  constructor (opt) {
    super(opt)
    opt = opt || Object.create(null)
    this.opt = opt
    this.file = opt.file || ''
    this.cwd = opt.cwd || process.cwd()
    this.maxReadSize = opt.maxReadSize
    this.preservePaths = !!opt.preservePaths
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.prefix = (opt.prefix || '').replace(/(\\|\/)+$/, '')
    this.linkCache = opt.linkCache || new Map()
    this.statCache = opt.statCache || new Map()
    this.readdirCache = opt.readdirCache || new Map()

    this[WRITEENTRYCLASS] = WriteEntry
    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    this.portable = !!opt.portable
    this.zip = null
    if (opt.gzip) {
      if (typeof opt.gzip !== 'object')
        opt.gzip = {}
      if (this.portable)
        opt.gzip.portable = true
      this.zip = new zlib.Gzip(opt.gzip)
      this.zip.on('data', chunk => super.write(chunk))
      this.zip.on('end', _ => super.end())
      this.zip.on('drain', _ => this[ONDRAIN]())
      this.on('resume', _ => this.zip.resume())
    } else
      this.on('drain', this[ONDRAIN])

    this.noDirRecurse = !!opt.noDirRecurse
    this.follow = !!opt.follow
    this.noMtime = !!opt.noMtime
    this.mtime = opt.mtime || null

    this.filter = typeof opt.filter === 'function' ? opt.filter : _ => true

    this[QUEUE] = new Yallist()
    this[JOBS] = 0
    this.jobs = +opt.jobs || 4
    this[PROCESSING] = false
    this[ENDED] = false
  }

  [WRITE] (chunk) {
    return super.write(chunk)
  }

  add (path) {
    this.write(path)
    return this
  }

  end (path) {
    if (path)
      this.write(path)
    this[ENDED] = true
    this[PROCESS]()
    return this
  }

  write (path) {
    if (this[ENDED])
      throw new Error('write after end')

    if (path instanceof ReadEntry)
      this[ADDTARENTRY](path)
    else
      this[ADDFSENTRY](path)
    return this.flowing
  }

  [ADDTARENTRY] (p) {
    const absolute = path.resolve(this.cwd, p.path)
    if (this.prefix)
      p.path = this.prefix + '/' + p.path.replace(/^\.(\/+|$)/, '')

    // in this case, we don't have to wait for the stat
    if (!this.filter(p.path, p))
      p.resume()
    else {
      const job = new PackJob(p.path, absolute, false)
      job.entry = new WriteEntryTar(p, this[ENTRYOPT](job))
      job.entry.on('end', _ => this[JOBDONE](job))
      this[JOBS] += 1
      this[QUEUE].push(job)
    }

    this[PROCESS]()
  }

  [ADDFSENTRY] (p) {
    const absolute = path.resolve(this.cwd, p)
    if (this.prefix)
      p = this.prefix + '/' + p.replace(/^\.(\/+|$)/, '')

    this[QUEUE].push(new PackJob(p, absolute))
    this[PROCESS]()
  }

  [STAT] (job) {
    job.pending = true
    this[JOBS] += 1
    const stat = this.follow ? 'stat' : 'lstat'
    fs[stat](job.absolute, (er, stat) => {
      job.pending = false
      this[JOBS] -= 1
      if (er)
        this.emit('error', er)
      else
        this[ONSTAT](job, stat)
    })
  }

  [ONSTAT] (job, stat) {
    this.statCache.set(job.absolute, stat)
    job.stat = stat

    // now we have the stat, we can filter it.
    if (!this.filter(job.path, stat))
      job.ignore = true

    this[PROCESS]()
  }

  [READDIR] (job) {
    job.pending = true
    this[JOBS] += 1
    fs.readdir(job.absolute, (er, entries) => {
      job.pending = false
      this[JOBS] -= 1
      if (er)
        return this.emit('error', er)
      this[ONREADDIR](job, entries)
    })
  }

  [ONREADDIR] (job, entries) {
    this.readdirCache.set(job.absolute, entries)
    job.readdir = entries
    this[PROCESS]()
  }

  [PROCESS] () {
    if (this[PROCESSING])
      return

    this[PROCESSING] = true
    for (let w = this[QUEUE].head;
      w !== null && this[JOBS] < this.jobs;
      w = w.next) {
      this[PROCESSJOB](w.value)
      if (w.value.ignore) {
        const p = w.next
        this[QUEUE].removeNode(w)
        w.next = p
      }
    }

    this[PROCESSING] = false

    if (this[ENDED] && !this[QUEUE].length && this[JOBS] === 0) {
      if (this.zip)
        this.zip.end(EOF)
      else {
        super.write(EOF)
        super.end()
      }
    }
  }

  get [CURRENT] () {
    return this[QUEUE] && this[QUEUE].head && this[QUEUE].head.value
  }

  [JOBDONE] (job) {
    this[QUEUE].shift()
    this[JOBS] -= 1
    this[PROCESS]()
  }

  [PROCESSJOB] (job) {
    if (job.pending)
      return

    if (job.entry) {
      if (job === this[CURRENT] && !job.piped)
        this[PIPE](job)
      return
    }

    if (!job.stat) {
      if (this.statCache.has(job.absolute))
        this[ONSTAT](job, this.statCache.get(job.absolute))
      else
        this[STAT](job)
    }
    if (!job.stat)
      return

    // filtered out!
    if (job.ignore)
      return

    if (!this.noDirRecurse && job.stat.isDirectory() && !job.readdir) {
      if (this.readdirCache.has(job.absolute))
        this[ONREADDIR](job, this.readdirCache.get(job.absolute))
      else
        this[READDIR](job)
      if (!job.readdir)
        return
    }

    // we know it doesn't have an entry, because that got checked above
    job.entry = this[ENTRY](job)
    if (!job.entry) {
      job.ignore = true
      return
    }

    if (job === this[CURRENT] && !job.piped)
      this[PIPE](job)
  }

  [ENTRYOPT] (job) {
    return {
      onwarn: (code, msg, data) => this.warn(code, msg, data),
      noPax: this.noPax,
      cwd: this.cwd,
      absolute: job.absolute,
      preservePaths: this.preservePaths,
      maxReadSize: this.maxReadSize,
      strict: this.strict,
      portable: this.portable,
      linkCache: this.linkCache,
      statCache: this.statCache,
      noMtime: this.noMtime,
      mtime: this.mtime,
    }
  }

  [ENTRY] (job) {
    this[JOBS] += 1
    try {
      return new this[WRITEENTRYCLASS](job.path, this[ENTRYOPT](job))
        .on('end', () => this[JOBDONE](job))
        .on('error', er => this.emit('error', er))
    } catch (er) {
      this.emit('error', er)
    }
  }

  [ONDRAIN] () {
    if (this[CURRENT] && this[CURRENT].entry)
      this[CURRENT].entry.resume()
  }

  // like .pipe() but using super, because our write() is special
  [PIPE] (job) {
    job.piped = true

    if (job.readdir) {
      job.readdir.forEach(entry => {
        const p = this.prefix ?
          job.path.slice(this.prefix.length + 1) || './'
          : job.path

        const base = p === './' ? '' : p.replace(/\/*$/, '/')
        this[ADDFSENTRY](base + entry)
      })
    }

    const source = job.entry
    const zip = this.zip

    if (zip) {
      source.on('data', chunk => {
        if (!zip.write(chunk))
          source.pause()
      })
    } else {
      source.on('data', chunk => {
        if (!super.write(chunk))
          source.pause()
      })
    }
  }

  pause () {
    if (this.zip)
      this.zip.pause()
    return super.pause()
  }
})

class PackSync extends Pack {
  constructor (opt) {
    super(opt)
    this[WRITEENTRYCLASS] = WriteEntrySync
  }

  // pause/resume are no-ops in sync streams.
  pause () {}
  resume () {}

  [STAT] (job) {
    const stat = this.follow ? 'statSync' : 'lstatSync'
    this[ONSTAT](job, fs[stat](job.absolute))
  }

  [READDIR] (job, stat) {
    this[ONREADDIR](job, fs.readdirSync(job.absolute))
  }

  // gotta get it all in this tick
  [PIPE] (job) {
    const source = job.entry
    const zip = this.zip

    if (job.readdir) {
      job.readdir.forEach(entry => {
        const p = this.prefix ?
          job.path.slice(this.prefix.length + 1) || './'
          : job.path

        const base = p === './' ? '' : p.replace(/\/*$/, '/')
        this[ADDFSENTRY](base + entry)
      })
    }

    if (zip) {
      source.on('data', chunk => {
        zip.write(chunk)
      })
    } else {
      source.on('data', chunk => {
        super[WRITE](chunk)
      })
    }
  }
}

Pack.Sync = PackSync

module.exports = Pack


/***/ }),

/***/ 8917:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// this[BUFFER] is the remainder of a chunk if we're waiting for
// the full 512 bytes of a header to come in.  We will Buffer.concat()
// it to the next write(), which is a mem copy, but a small one.
//
// this[QUEUE] is a Yallist of entries that haven't been emitted
// yet this can only get filled up if the user keeps write()ing after
// a write() returns false, or does a write() with more than one entry
//
// We don't buffer chunks, we always parse them and either create an
// entry, or push it into the active entry.  The ReadEntry class knows
// to throw data away if .ignore=true
//
// Shift entry off the buffer when it emits 'end', and emit 'entry' for
// the next one in the list.
//
// At any time, we're pushing body chunks into the entry at WRITEENTRY,
// and waiting for 'end' on the entry at READENTRY
//
// ignored entries get .resume() called on them straight away

const warner = __nccwpck_require__(5899)
const Header = __nccwpck_require__(6043)
const EE = __nccwpck_require__(8614)
const Yallist = __nccwpck_require__(665)
const maxMetaEntrySize = 1024 * 1024
const Entry = __nccwpck_require__(8116)
const Pax = __nccwpck_require__(7996)
const zlib = __nccwpck_require__(3486)

const gzipHeader = Buffer.from([0x1f, 0x8b])
const STATE = Symbol('state')
const WRITEENTRY = Symbol('writeEntry')
const READENTRY = Symbol('readEntry')
const NEXTENTRY = Symbol('nextEntry')
const PROCESSENTRY = Symbol('processEntry')
const EX = Symbol('extendedHeader')
const GEX = Symbol('globalExtendedHeader')
const META = Symbol('meta')
const EMITMETA = Symbol('emitMeta')
const BUFFER = Symbol('buffer')
const QUEUE = Symbol('queue')
const ENDED = Symbol('ended')
const EMITTEDEND = Symbol('emittedEnd')
const EMIT = Symbol('emit')
const UNZIP = Symbol('unzip')
const CONSUMECHUNK = Symbol('consumeChunk')
const CONSUMECHUNKSUB = Symbol('consumeChunkSub')
const CONSUMEBODY = Symbol('consumeBody')
const CONSUMEMETA = Symbol('consumeMeta')
const CONSUMEHEADER = Symbol('consumeHeader')
const CONSUMING = Symbol('consuming')
const BUFFERCONCAT = Symbol('bufferConcat')
const MAYBEEND = Symbol('maybeEnd')
const WRITING = Symbol('writing')
const ABORTED = Symbol('aborted')
const DONE = Symbol('onDone')
const SAW_VALID_ENTRY = Symbol('sawValidEntry')
const SAW_NULL_BLOCK = Symbol('sawNullBlock')
const SAW_EOF = Symbol('sawEOF')

const noop = _ => true

module.exports = warner(class Parser extends EE {
  constructor (opt) {
    opt = opt || {}
    super(opt)

    this.file = opt.file || ''

    // set to boolean false when an entry starts.  1024 bytes of \0
    // is technically a valid tarball, albeit a boring one.
    this[SAW_VALID_ENTRY] = null

    // these BADARCHIVE errors can't be detected early. listen on DONE.
    this.on(DONE, _ => {
      if (this[STATE] === 'begin' || this[SAW_VALID_ENTRY] === false) {
        // either less than 1 block of data, or all entries were invalid.
        // Either way, probably not even a tarball.
        this.warn('TAR_BAD_ARCHIVE', 'Unrecognized archive format')
      }
    })

    if (opt.ondone)
      this.on(DONE, opt.ondone)
    else {
      this.on(DONE, _ => {
        this.emit('prefinish')
        this.emit('finish')
        this.emit('end')
        this.emit('close')
      })
    }

    this.strict = !!opt.strict
    this.maxMetaEntrySize = opt.maxMetaEntrySize || maxMetaEntrySize
    this.filter = typeof opt.filter === 'function' ? opt.filter : noop

    // have to set this so that streams are ok piping into it
    this.writable = true
    this.readable = false

    this[QUEUE] = new Yallist()
    this[BUFFER] = null
    this[READENTRY] = null
    this[WRITEENTRY] = null
    this[STATE] = 'begin'
    this[META] = ''
    this[EX] = null
    this[GEX] = null
    this[ENDED] = false
    this[UNZIP] = null
    this[ABORTED] = false
    this[SAW_NULL_BLOCK] = false
    this[SAW_EOF] = false
    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)
    if (typeof opt.onentry === 'function')
      this.on('entry', opt.onentry)
  }

  [CONSUMEHEADER] (chunk, position) {
    if (this[SAW_VALID_ENTRY] === null)
      this[SAW_VALID_ENTRY] = false
    let header
    try {
      header = new Header(chunk, position, this[EX], this[GEX])
    } catch (er) {
      return this.warn('TAR_ENTRY_INVALID', er)
    }

    if (header.nullBlock) {
      if (this[SAW_NULL_BLOCK]) {
        this[SAW_EOF] = true
        // ending an archive with no entries.  pointless, but legal.
        if (this[STATE] === 'begin')
          this[STATE] = 'header'
        this[EMIT]('eof')
      } else {
        this[SAW_NULL_BLOCK] = true
        this[EMIT]('nullBlock')
      }
    } else {
      this[SAW_NULL_BLOCK] = false
      if (!header.cksumValid)
        this.warn('TAR_ENTRY_INVALID', 'checksum failure', {header})
      else if (!header.path)
        this.warn('TAR_ENTRY_INVALID', 'path is required', {header})
      else {
        const type = header.type
        if (/^(Symbolic)?Link$/.test(type) && !header.linkpath)
          this.warn('TAR_ENTRY_INVALID', 'linkpath required', {header})
        else if (!/^(Symbolic)?Link$/.test(type) && header.linkpath)
          this.warn('TAR_ENTRY_INVALID', 'linkpath forbidden', {header})
        else {
          const entry = this[WRITEENTRY] = new Entry(header, this[EX], this[GEX])

          // we do this for meta & ignored entries as well, because they
          // are still valid tar, or else we wouldn't know to ignore them
          if (!this[SAW_VALID_ENTRY]) {
            if (entry.remain) {
              // this might be the one!
              const onend = () => {
                if (!entry.invalid)
                  this[SAW_VALID_ENTRY] = true
              }
              entry.on('end', onend)
            } else
              this[SAW_VALID_ENTRY] = true
          }

          if (entry.meta) {
            if (entry.size > this.maxMetaEntrySize) {
              entry.ignore = true
              this[EMIT]('ignoredEntry', entry)
              this[STATE] = 'ignore'
              entry.resume()
            } else if (entry.size > 0) {
              this[META] = ''
              entry.on('data', c => this[META] += c)
              this[STATE] = 'meta'
            }
          } else {
            this[EX] = null
            entry.ignore = entry.ignore || !this.filter(entry.path, entry)

            if (entry.ignore) {
              // probably valid, just not something we care about
              this[EMIT]('ignoredEntry', entry)
              this[STATE] = entry.remain ? 'ignore' : 'header'
              entry.resume()
            } else {
              if (entry.remain)
                this[STATE] = 'body'
              else {
                this[STATE] = 'header'
                entry.end()
              }

              if (!this[READENTRY]) {
                this[QUEUE].push(entry)
                this[NEXTENTRY]()
              } else
                this[QUEUE].push(entry)
            }
          }
        }
      }
    }
  }

  [PROCESSENTRY] (entry) {
    let go = true

    if (!entry) {
      this[READENTRY] = null
      go = false
    } else if (Array.isArray(entry))
      this.emit.apply(this, entry)
    else {
      this[READENTRY] = entry
      this.emit('entry', entry)
      if (!entry.emittedEnd) {
        entry.on('end', _ => this[NEXTENTRY]())
        go = false
      }
    }

    return go
  }

  [NEXTENTRY] () {
    do {} while (this[PROCESSENTRY](this[QUEUE].shift()))

    if (!this[QUEUE].length) {
      // At this point, there's nothing in the queue, but we may have an
      // entry which is being consumed (readEntry).
      // If we don't, then we definitely can handle more data.
      // If we do, and either it's flowing, or it has never had any data
      // written to it, then it needs more.
      // The only other possibility is that it has returned false from a
      // write() call, so we wait for the next drain to continue.
      const re = this[READENTRY]
      const drainNow = !re || re.flowing || re.size === re.remain
      if (drainNow) {
        if (!this[WRITING])
          this.emit('drain')
      } else
        re.once('drain', _ => this.emit('drain'))
    }
  }

  [CONSUMEBODY] (chunk, position) {
    // write up to but no  more than writeEntry.blockRemain
    const entry = this[WRITEENTRY]
    const br = entry.blockRemain
    const c = (br >= chunk.length && position === 0) ? chunk
      : chunk.slice(position, position + br)

    entry.write(c)

    if (!entry.blockRemain) {
      this[STATE] = 'header'
      this[WRITEENTRY] = null
      entry.end()
    }

    return c.length
  }

  [CONSUMEMETA] (chunk, position) {
    const entry = this[WRITEENTRY]
    const ret = this[CONSUMEBODY](chunk, position)

    // if we finished, then the entry is reset
    if (!this[WRITEENTRY])
      this[EMITMETA](entry)

    return ret
  }

  [EMIT] (ev, data, extra) {
    if (!this[QUEUE].length && !this[READENTRY])
      this.emit(ev, data, extra)
    else
      this[QUEUE].push([ev, data, extra])
  }

  [EMITMETA] (entry) {
    this[EMIT]('meta', this[META])
    switch (entry.type) {
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this[EX] = Pax.parse(this[META], this[EX], false)
        break

      case 'GlobalExtendedHeader':
        this[GEX] = Pax.parse(this[META], this[GEX], true)
        break

      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
        this[EX] = this[EX] || Object.create(null)
        this[EX].path = this[META].replace(/\0.*/, '')
        break

      case 'NextFileHasLongLinkpath':
        this[EX] = this[EX] || Object.create(null)
        this[EX].linkpath = this[META].replace(/\0.*/, '')
        break

      /* istanbul ignore next */
      default: throw new Error('unknown meta: ' + entry.type)
    }
  }

  abort (error) {
    this[ABORTED] = true
    this.emit('abort', error)
    // always throws, even in non-strict mode
    this.warn('TAR_ABORT', error, { recoverable: false })
  }

  write (chunk) {
    if (this[ABORTED])
      return

    // first write, might be gzipped
    if (this[UNZIP] === null && chunk) {
      if (this[BUFFER]) {
        chunk = Buffer.concat([this[BUFFER], chunk])
        this[BUFFER] = null
      }
      if (chunk.length < gzipHeader.length) {
        this[BUFFER] = chunk
        return true
      }
      for (let i = 0; this[UNZIP] === null && i < gzipHeader.length; i++) {
        if (chunk[i] !== gzipHeader[i])
          this[UNZIP] = false
      }
      if (this[UNZIP] === null) {
        const ended = this[ENDED]
        this[ENDED] = false
        this[UNZIP] = new zlib.Unzip()
        this[UNZIP].on('data', chunk => this[CONSUMECHUNK](chunk))
        this[UNZIP].on('error', er => this.abort(er))
        this[UNZIP].on('end', _ => {
          this[ENDED] = true
          this[CONSUMECHUNK]()
        })
        this[WRITING] = true
        const ret = this[UNZIP][ended ? 'end' : 'write'](chunk)
        this[WRITING] = false
        return ret
      }
    }

    this[WRITING] = true
    if (this[UNZIP])
      this[UNZIP].write(chunk)
    else
      this[CONSUMECHUNK](chunk)
    this[WRITING] = false

    // return false if there's a queue, or if the current entry isn't flowing
    const ret =
      this[QUEUE].length ? false :
      this[READENTRY] ? this[READENTRY].flowing :
      true

    // if we have no queue, then that means a clogged READENTRY
    if (!ret && !this[QUEUE].length)
      this[READENTRY].once('drain', _ => this.emit('drain'))

    return ret
  }

  [BUFFERCONCAT] (c) {
    if (c && !this[ABORTED])
      this[BUFFER] = this[BUFFER] ? Buffer.concat([this[BUFFER], c]) : c
  }

  [MAYBEEND] () {
    if (this[ENDED] &&
        !this[EMITTEDEND] &&
        !this[ABORTED] &&
        !this[CONSUMING]) {
      this[EMITTEDEND] = true
      const entry = this[WRITEENTRY]
      if (entry && entry.blockRemain) {
        // truncated, likely a damaged file
        const have = this[BUFFER] ? this[BUFFER].length : 0
        this.warn('TAR_BAD_ARCHIVE', `Truncated input (needed ${
          entry.blockRemain} more bytes, only ${have} available)`, {entry})
        if (this[BUFFER])
          entry.write(this[BUFFER])
        entry.end()
      }
      this[EMIT](DONE)
    }
  }

  [CONSUMECHUNK] (chunk) {
    if (this[CONSUMING])
      this[BUFFERCONCAT](chunk)
    else if (!chunk && !this[BUFFER])
      this[MAYBEEND]()
    else {
      this[CONSUMING] = true
      if (this[BUFFER]) {
        this[BUFFERCONCAT](chunk)
        const c = this[BUFFER]
        this[BUFFER] = null
        this[CONSUMECHUNKSUB](c)
      } else
        this[CONSUMECHUNKSUB](chunk)

      while (this[BUFFER] &&
          this[BUFFER].length >= 512 &&
          !this[ABORTED] &&
          !this[SAW_EOF]) {
        const c = this[BUFFER]
        this[BUFFER] = null
        this[CONSUMECHUNKSUB](c)
      }
      this[CONSUMING] = false
    }

    if (!this[BUFFER] || this[ENDED])
      this[MAYBEEND]()
  }

  [CONSUMECHUNKSUB] (chunk) {
    // we know that we are in CONSUMING mode, so anything written goes into
    // the buffer.  Advance the position and put any remainder in the buffer.
    let position = 0
    const length = chunk.length
    while (position + 512 <= length && !this[ABORTED] && !this[SAW_EOF]) {
      switch (this[STATE]) {
        case 'begin':
        case 'header':
          this[CONSUMEHEADER](chunk, position)
          position += 512
          break

        case 'ignore':
        case 'body':
          position += this[CONSUMEBODY](chunk, position)
          break

        case 'meta':
          position += this[CONSUMEMETA](chunk, position)
          break

        /* istanbul ignore next */
        default:
          throw new Error('invalid state: ' + this[STATE])
      }
    }

    if (position < length) {
      if (this[BUFFER])
        this[BUFFER] = Buffer.concat([chunk.slice(position), this[BUFFER]])
      else
        this[BUFFER] = chunk.slice(position)
    }
  }

  end (chunk) {
    if (!this[ABORTED]) {
      if (this[UNZIP])
        this[UNZIP].end(chunk)
      else {
        this[ENDED] = true
        this.write(chunk)
      }
    }
  }
})


/***/ }),

/***/ 9587:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// A path exclusive reservation system
// reserve([list, of, paths], fn)
// When the fn is first in line for all its paths, it
// is called with a cb that clears the reservation.
//
// Used by async unpack to avoid clobbering paths in use,
// while still allowing maximal safe parallelization.

const assert = __nccwpck_require__(2357)

module.exports = () => {
  // path => [function or Set]
  // A Set object means a directory reservation
  // A fn is a direct reservation on that path
  const queues = new Map()

  // fn => {paths:[path,...], dirs:[path, ...]}
  const reservations = new Map()

  // return a set of parent dirs for a given path
  const { join } = __nccwpck_require__(5622)
  const getDirs = path =>
    join(path).split(/[\\/]/).slice(0, -1).reduce((set, path) =>
      set.length ? set.concat(join(set[set.length - 1], path)) : [path], [])

  // functions currently running
  const running = new Set()

  // return the queues for each path the function cares about
  // fn => {paths, dirs}
  const getQueues = fn => {
    const res = reservations.get(fn)
    /* istanbul ignore if - unpossible */
    if (!res)
      throw new Error('function does not have any path reservations')
    return {
      paths: res.paths.map(path => queues.get(path)),
      dirs: [...res.dirs].map(path => queues.get(path)),
    }
  }

  // check if fn is first in line for all its paths, and is
  // included in the first set for all its dir queues
  const check = fn => {
    const {paths, dirs} = getQueues(fn)
    return paths.every(q => q[0] === fn) &&
      dirs.every(q => q[0] instanceof Set && q[0].has(fn))
  }

  // run the function if it's first in line and not already running
  const run = fn => {
    if (running.has(fn) || !check(fn))
      return false
    running.add(fn)
    fn(() => clear(fn))
    return true
  }

  const clear = fn => {
    if (!running.has(fn))
      return false

    const { paths, dirs } = reservations.get(fn)
    const next = new Set()

    paths.forEach(path => {
      const q = queues.get(path)
      assert.equal(q[0], fn)
      if (q.length === 1)
        queues.delete(path)
      else {
        q.shift()
        if (typeof q[0] === 'function')
          next.add(q[0])
        else
          q[0].forEach(fn => next.add(fn))
      }
    })

    dirs.forEach(dir => {
      const q = queues.get(dir)
      assert(q[0] instanceof Set)
      if (q[0].size === 1 && q.length === 1)
        queues.delete(dir)
      else if (q[0].size === 1) {
        q.shift()

        // must be a function or else the Set would've been reused
        next.add(q[0])
      } else
        q[0].delete(fn)
    })
    running.delete(fn)

    next.forEach(fn => run(fn))
    return true
  }

  const reserve = (paths, fn) => {
    const dirs = new Set(
      paths.map(path => getDirs(path)).reduce((a, b) => a.concat(b))
    )
    reservations.set(fn, {dirs, paths})
    paths.forEach(path => {
      const q = queues.get(path)
      if (!q)
        queues.set(path, [fn])
      else
        q.push(fn)
    })
    dirs.forEach(dir => {
      const q = queues.get(dir)
      if (!q)
        queues.set(dir, [new Set([fn])])
      else if (q[q.length - 1] instanceof Set)
        q[q.length - 1].add(fn)
      else
        q.push(new Set([fn]))
    })

    return run(fn)
  }

  return { check, reserve }
}


/***/ }),

/***/ 7996:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const Header = __nccwpck_require__(6043)
const path = __nccwpck_require__(5622)

class Pax {
  constructor (obj, global) {
    this.atime = obj.atime || null
    this.charset = obj.charset || null
    this.comment = obj.comment || null
    this.ctime = obj.ctime || null
    this.gid = obj.gid || null
    this.gname = obj.gname || null
    this.linkpath = obj.linkpath || null
    this.mtime = obj.mtime || null
    this.path = obj.path || null
    this.size = obj.size || null
    this.uid = obj.uid || null
    this.uname = obj.uname || null
    this.dev = obj.dev || null
    this.ino = obj.ino || null
    this.nlink = obj.nlink || null
    this.global = global || false
  }

  encode () {
    const body = this.encodeBody()
    if (body === '')
      return null

    const bodyLen = Buffer.byteLength(body)
    // round up to 512 bytes
    // add 512 for header
    const bufLen = 512 * Math.ceil(1 + bodyLen / 512)
    const buf = Buffer.allocUnsafe(bufLen)

    // 0-fill the header section, it might not hit every field
    for (let i = 0; i < 512; i++)
      buf[i] = 0

    new Header({
      // XXX split the path
      // then the path should be PaxHeader + basename, but less than 99,
      // prepend with the dirname
      path: ('PaxHeader/' + path.basename(this.path)).slice(0, 99),
      mode: this.mode || 0o644,
      uid: this.uid || null,
      gid: this.gid || null,
      size: bodyLen,
      mtime: this.mtime || null,
      type: this.global ? 'GlobalExtendedHeader' : 'ExtendedHeader',
      linkpath: '',
      uname: this.uname || '',
      gname: this.gname || '',
      devmaj: 0,
      devmin: 0,
      atime: this.atime || null,
      ctime: this.ctime || null,
    }).encode(buf)

    buf.write(body, 512, bodyLen, 'utf8')

    // null pad after the body
    for (let i = bodyLen + 512; i < buf.length; i++)
      buf[i] = 0

    return buf
  }

  encodeBody () {
    return (
      this.encodeField('path') +
      this.encodeField('ctime') +
      this.encodeField('atime') +
      this.encodeField('dev') +
      this.encodeField('ino') +
      this.encodeField('nlink') +
      this.encodeField('charset') +
      this.encodeField('comment') +
      this.encodeField('gid') +
      this.encodeField('gname') +
      this.encodeField('linkpath') +
      this.encodeField('mtime') +
      this.encodeField('size') +
      this.encodeField('uid') +
      this.encodeField('uname')
    )
  }

  encodeField (field) {
    if (this[field] === null || this[field] === undefined)
      return ''
    const v = this[field] instanceof Date ? this[field].getTime() / 1000
      : this[field]
    const s = ' ' +
      (field === 'dev' || field === 'ino' || field === 'nlink'
        ? 'SCHILY.' : '') +
      field + '=' + v + '\n'
    const byteLen = Buffer.byteLength(s)
    // the digits includes the length of the digits in ascii base-10
    // so if it's 9 characters, then adding 1 for the 9 makes it 10
    // which makes it 11 chars.
    let digits = Math.floor(Math.log(byteLen) / Math.log(10)) + 1
    if (byteLen + digits >= Math.pow(10, digits))
      digits += 1
    const len = digits + byteLen
    return len + s
  }
}

Pax.parse = (string, ex, g) => new Pax(merge(parseKV(string), ex), g)

const merge = (a, b) =>
  b ? Object.keys(a).reduce((s, k) => (s[k] = a[k], s), b) : a

const parseKV = string =>
  string
    .replace(/\n$/, '')
    .split('\n')
    .reduce(parseKVLine, Object.create(null))

const parseKVLine = (set, line) => {
  const n = parseInt(line, 10)

  // XXX Values with \n in them will fail this.
  // Refactor to not be a naive line-by-line parse.
  if (n !== Buffer.byteLength(line) + 1)
    return set

  line = line.substr((n + ' ').length)
  const kv = line.split('=')
  const k = kv.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1')
  if (!k)
    return set

  const v = kv.join('=')
  set[k] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(k)
    ? new Date(v * 1000)
    : /^[0-9]+$/.test(v) ? +v
    : v
  return set
}

module.exports = Pax


/***/ }),

/***/ 8116:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const MiniPass = __nccwpck_require__(1077)

const SLURP = Symbol('slurp')
module.exports = class ReadEntry extends MiniPass {
  constructor (header, ex, gex) {
    super()
    // read entries always start life paused.  this is to avoid the
    // situation where Minipass's auto-ending empty streams results
    // in an entry ending before we're ready for it.
    this.pause()
    this.extended = ex
    this.globalExtended = gex
    this.header = header
    this.startBlockSize = 512 * Math.ceil(header.size / 512)
    this.blockRemain = this.startBlockSize
    this.remain = header.size
    this.type = header.type
    this.meta = false
    this.ignore = false
    switch (this.type) {
      case 'File':
      case 'OldFile':
      case 'Link':
      case 'SymbolicLink':
      case 'CharacterDevice':
      case 'BlockDevice':
      case 'Directory':
      case 'FIFO':
      case 'ContiguousFile':
      case 'GNUDumpDir':
        break

      case 'NextFileHasLongLinkpath':
      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
      case 'GlobalExtendedHeader':
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this.meta = true
        break

      // NOTE: gnutar and bsdtar treat unrecognized types as 'File'
      // it may be worth doing the same, but with a warning.
      default:
        this.ignore = true
    }

    this.path = header.path
    this.mode = header.mode
    if (this.mode)
      this.mode = this.mode & 0o7777
    this.uid = header.uid
    this.gid = header.gid
    this.uname = header.uname
    this.gname = header.gname
    this.size = header.size
    this.mtime = header.mtime
    this.atime = header.atime
    this.ctime = header.ctime
    this.linkpath = header.linkpath
    this.uname = header.uname
    this.gname = header.gname

    if (ex)
      this[SLURP](ex)
    if (gex)
      this[SLURP](gex, true)
  }

  write (data) {
    const writeLen = data.length
    if (writeLen > this.blockRemain)
      throw new Error('writing more to entry than is appropriate')

    const r = this.remain
    const br = this.blockRemain
    this.remain = Math.max(0, r - writeLen)
    this.blockRemain = Math.max(0, br - writeLen)
    if (this.ignore)
      return true

    if (r >= writeLen)
      return super.write(data)

    // r < writeLen
    return super.write(data.slice(0, r))
  }

  [SLURP] (ex, global) {
    for (const k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path'))
        this[k] = ex[k]
    }
  }
}


/***/ }),

/***/ 5923:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// tar -r
const hlo = __nccwpck_require__(5274)
const Pack = __nccwpck_require__(7900)
const fs = __nccwpck_require__(5747)
const fsm = __nccwpck_require__(7714)
const t = __nccwpck_require__(1525)
const path = __nccwpck_require__(5622)

// starting at the head of the file, read a Header
// If the checksum is invalid, that's our position to start writing
// If it is, jump forward by the specified size (round up to 512)
// and try again.
// Write the new Pack stream starting there.

const Header = __nccwpck_require__(6043)

module.exports = (opt_, files, cb) => {
  const opt = hlo(opt_)

  if (!opt.file)
    throw new TypeError('file is required')

  if (opt.gzip)
    throw new TypeError('cannot append to compressed archives')

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  return opt.sync ? replaceSync(opt, files)
    : replace(opt, files, cb)
}

const replaceSync = (opt, files) => {
  const p = new Pack.Sync(opt)

  let threw = true
  let fd
  let position

  try {
    try {
      fd = fs.openSync(opt.file, 'r+')
    } catch (er) {
      if (er.code === 'ENOENT')
        fd = fs.openSync(opt.file, 'w+')
      else
        throw er
    }

    const st = fs.fstatSync(fd)
    const headBuf = Buffer.alloc(512)

    POSITION: for (position = 0; position < st.size; position += 512) {
      for (let bufPos = 0, bytes = 0; bufPos < 512; bufPos += bytes) {
        bytes = fs.readSync(
          fd, headBuf, bufPos, headBuf.length - bufPos, position + bufPos
        )

        if (position === 0 && headBuf[0] === 0x1f && headBuf[1] === 0x8b)
          throw new Error('cannot append to compressed archives')

        if (!bytes)
          break POSITION
      }

      const h = new Header(headBuf)
      if (!h.cksumValid)
        break
      const entryBlockSize = 512 * Math.ceil(h.size / 512)
      if (position + entryBlockSize + 512 > st.size)
        break
      // the 512 for the header we just parsed will be added as well
      // also jump ahead all the blocks for the body
      position += entryBlockSize
      if (opt.mtimeCache)
        opt.mtimeCache.set(h.path, h.mtime)
    }
    threw = false

    streamSync(opt, p, position, fd, files)
  } finally {
    if (threw) {
      try {
        fs.closeSync(fd)
      } catch (er) {}
    }
  }
}

const streamSync = (opt, p, position, fd, files) => {
  const stream = new fsm.WriteStreamSync(opt.file, {
    fd: fd,
    start: position,
  })
  p.pipe(stream)
  addFilesSync(p, files)
}

const replace = (opt, files, cb) => {
  files = Array.from(files)
  const p = new Pack(opt)

  const getPos = (fd, size, cb_) => {
    const cb = (er, pos) => {
      if (er)
        fs.close(fd, _ => cb_(er))
      else
        cb_(null, pos)
    }

    let position = 0
    if (size === 0)
      return cb(null, 0)

    let bufPos = 0
    const headBuf = Buffer.alloc(512)
    const onread = (er, bytes) => {
      if (er)
        return cb(er)
      bufPos += bytes
      if (bufPos < 512 && bytes) {
        return fs.read(
          fd, headBuf, bufPos, headBuf.length - bufPos,
          position + bufPos, onread
        )
      }

      if (position === 0 && headBuf[0] === 0x1f && headBuf[1] === 0x8b)
        return cb(new Error('cannot append to compressed archives'))

      // truncated header
      if (bufPos < 512)
        return cb(null, position)

      const h = new Header(headBuf)
      if (!h.cksumValid)
        return cb(null, position)

      const entryBlockSize = 512 * Math.ceil(h.size / 512)
      if (position + entryBlockSize + 512 > size)
        return cb(null, position)

      position += entryBlockSize + 512
      if (position >= size)
        return cb(null, position)

      if (opt.mtimeCache)
        opt.mtimeCache.set(h.path, h.mtime)
      bufPos = 0
      fs.read(fd, headBuf, 0, 512, position, onread)
    }
    fs.read(fd, headBuf, 0, 512, position, onread)
  }

  const promise = new Promise((resolve, reject) => {
    p.on('error', reject)
    let flag = 'r+'
    const onopen = (er, fd) => {
      if (er && er.code === 'ENOENT' && flag === 'r+') {
        flag = 'w+'
        return fs.open(opt.file, flag, onopen)
      }

      if (er)
        return reject(er)

      fs.fstat(fd, (er, st) => {
        if (er)
          return reject(er)
        getPos(fd, st.size, (er, position) => {
          if (er)
            return reject(er)
          const stream = new fsm.WriteStream(opt.file, {
            fd: fd,
            start: position,
          })
          p.pipe(stream)
          stream.on('error', reject)
          stream.on('close', resolve)
          addFilesAsync(p, files)
        })
      })
    }
    fs.open(opt.file, flag, onopen)
  })

  return cb ? promise.then(cb, cb) : promise
}

const addFilesSync = (p, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '@') {
      t({
        file: path.resolve(p.cwd, file.substr(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry),
      })
    } else
      p.add(file)
  })
  p.end()
}

const addFilesAsync = (p, files) => {
  while (files.length) {
    const file = files.shift()
    if (file.charAt(0) === '@') {
      return t({
        file: path.resolve(p.cwd, file.substr(1)),
        noResume: true,
        onentry: entry => p.add(entry),
      }).then(_ => addFilesAsync(p, files))
    } else
      p.add(file)
  }
  p.end()
}


/***/ }),

/***/ 4173:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// map types from key to human-friendly name
exports.name = new Map([
  ['0', 'File'],
  // same as File
  ['', 'OldFile'],
  ['1', 'Link'],
  ['2', 'SymbolicLink'],
  // Devices and FIFOs aren't fully supported
  // they are parsed, but skipped when unpacking
  ['3', 'CharacterDevice'],
  ['4', 'BlockDevice'],
  ['5', 'Directory'],
  ['6', 'FIFO'],
  // same as File
  ['7', 'ContiguousFile'],
  // pax headers
  ['g', 'GlobalExtendedHeader'],
  ['x', 'ExtendedHeader'],
  // vendor-specific stuff
  // skip
  ['A', 'SolarisACL'],
  // like 5, but with data, which should be skipped
  ['D', 'GNUDumpDir'],
  // metadata only, skip
  ['I', 'Inode'],
  // data = link path of next file
  ['K', 'NextFileHasLongLinkpath'],
  // data = path of next file
  ['L', 'NextFileHasLongPath'],
  // skip
  ['M', 'ContinuationFile'],
  // like L
  ['N', 'OldGnuLongPath'],
  // skip
  ['S', 'SparseFile'],
  // skip
  ['V', 'TapeVolumeHeader'],
  // like x
  ['X', 'OldExtendedHeader'],
])

// map the other direction
exports.code = new Map(Array.from(exports.name).map(kv => [kv[1], kv[0]]))


/***/ }),

/***/ 7628:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// the PEND/UNPEND stuff tracks whether we're ready to emit end/close yet.
// but the path reservations are required to avoid race conditions where
// parallelized unpack ops may mess with one another, due to dependencies
// (like a Link depending on its target) or destructive operations (like
// clobbering an fs object to create one of a different type.)

const assert = __nccwpck_require__(2357)
const Parser = __nccwpck_require__(8917)
const fs = __nccwpck_require__(5747)
const fsm = __nccwpck_require__(7714)
const path = __nccwpck_require__(5622)
const mkdir = __nccwpck_require__(9624)
const wc = __nccwpck_require__(4808)
const pathReservations = __nccwpck_require__(9587)

const ONENTRY = Symbol('onEntry')
const CHECKFS = Symbol('checkFs')
const CHECKFS2 = Symbol('checkFs2')
const ISREUSABLE = Symbol('isReusable')
const MAKEFS = Symbol('makeFs')
const FILE = Symbol('file')
const DIRECTORY = Symbol('directory')
const LINK = Symbol('link')
const SYMLINK = Symbol('symlink')
const HARDLINK = Symbol('hardlink')
const UNSUPPORTED = Symbol('unsupported')
const CHECKPATH = Symbol('checkPath')
const MKDIR = Symbol('mkdir')
const ONERROR = Symbol('onError')
const PENDING = Symbol('pending')
const PEND = Symbol('pend')
const UNPEND = Symbol('unpend')
const ENDED = Symbol('ended')
const MAYBECLOSE = Symbol('maybeClose')
const SKIP = Symbol('skip')
const DOCHOWN = Symbol('doChown')
const UID = Symbol('uid')
const GID = Symbol('gid')
const crypto = __nccwpck_require__(6417)
const getFlag = __nccwpck_require__(1172)

/* istanbul ignore next */
const neverCalled = () => {
  throw new Error('sync function called cb somehow?!?')
}

// Unlinks on Windows are not atomic.
//
// This means that if you have a file entry, followed by another
// file entry with an identical name, and you cannot re-use the file
// (because it's a hardlink, or because unlink:true is set, or it's
// Windows, which does not have useful nlink values), then the unlink
// will be committed to the disk AFTER the new file has been written
// over the old one, deleting the new file.
//
// To work around this, on Windows systems, we rename the file and then
// delete the renamed file.  It's a sloppy kludge, but frankly, I do not
// know of a better way to do this, given windows' non-atomic unlink
// semantics.
//
// See: https://github.com/npm/node-tar/issues/183
/* istanbul ignore next */
const unlinkFile = (path, cb) => {
  if (process.platform !== 'win32')
    return fs.unlink(path, cb)

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex')
  fs.rename(path, name, er => {
    if (er)
      return cb(er)
    fs.unlink(name, cb)
  })
}

/* istanbul ignore next */
const unlinkFileSync = path => {
  if (process.platform !== 'win32')
    return fs.unlinkSync(path)

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex')
  fs.renameSync(path, name)
  fs.unlinkSync(name)
}

// this.gid, entry.gid, this.processUid
const uint32 = (a, b, c) =>
  a === a >>> 0 ? a
  : b === b >>> 0 ? b
  : c

class Unpack extends Parser {
  constructor (opt) {
    if (!opt)
      opt = {}

    opt.ondone = _ => {
      this[ENDED] = true
      this[MAYBECLOSE]()
    }

    super(opt)

    this.reservations = pathReservations()

    this.transform = typeof opt.transform === 'function' ? opt.transform : null

    this.writable = true
    this.readable = false

    this[PENDING] = 0
    this[ENDED] = false

    this.dirCache = opt.dirCache || new Map()

    if (typeof opt.uid === 'number' || typeof opt.gid === 'number') {
      // need both or neither
      if (typeof opt.uid !== 'number' || typeof opt.gid !== 'number')
        throw new TypeError('cannot set owner without number uid and gid')
      if (opt.preserveOwner) {
        throw new TypeError(
          'cannot preserve owner in archive and also set owner explicitly')
      }
      this.uid = opt.uid
      this.gid = opt.gid
      this.setOwner = true
    } else {
      this.uid = null
      this.gid = null
      this.setOwner = false
    }

    // default true for root
    if (opt.preserveOwner === undefined && typeof opt.uid !== 'number')
      this.preserveOwner = process.getuid && process.getuid() === 0
    else
      this.preserveOwner = !!opt.preserveOwner

    this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ?
      process.getuid() : null
    this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ?
      process.getgid() : null

    // mostly just for testing, but useful in some cases.
    // Forcibly trigger a chown on every entry, no matter what
    this.forceChown = opt.forceChown === true

    // turn ><?| in filenames into 0xf000-higher encoded forms
    this.win32 = !!opt.win32 || process.platform === 'win32'

    // do not unpack over files that are newer than what's in the archive
    this.newer = !!opt.newer

    // do not unpack over ANY files
    this.keep = !!opt.keep

    // do not set mtime/atime of extracted entries
    this.noMtime = !!opt.noMtime

    // allow .., absolute path entries, and unpacking through symlinks
    // without this, warn and skip .., relativize absolutes, and error
    // on symlinks in extraction path
    this.preservePaths = !!opt.preservePaths

    // unlink files and links before writing. This breaks existing hard
    // links, and removes symlink directories rather than erroring
    this.unlink = !!opt.unlink

    this.cwd = path.resolve(opt.cwd || process.cwd())
    this.strip = +opt.strip || 0
    // if we're not chmodding, then we don't need the process umask
    this.processUmask = opt.noChmod ? 0 : process.umask()
    this.umask = typeof opt.umask === 'number' ? opt.umask : this.processUmask

    // default mode for dirs created as parents
    this.dmode = opt.dmode || (0o0777 & (~this.umask))
    this.fmode = opt.fmode || (0o0666 & (~this.umask))

    this.on('entry', entry => this[ONENTRY](entry))
  }

  // a bad or damaged archive is a warning for Parser, but an error
  // when extracting.  Mark those errors as unrecoverable, because
  // the Unpack contract cannot be met.
  warn (code, msg, data = {}) {
    if (code === 'TAR_BAD_ARCHIVE' || code === 'TAR_ABORT')
      data.recoverable = false
    return super.warn(code, msg, data)
  }

  [MAYBECLOSE] () {
    if (this[ENDED] && this[PENDING] === 0) {
      this.emit('prefinish')
      this.emit('finish')
      this.emit('end')
      this.emit('close')
    }
  }

  [CHECKPATH] (entry) {
    if (this.strip) {
      const parts = entry.path.split(/\/|\\/)
      if (parts.length < this.strip)
        return false
      entry.path = parts.slice(this.strip).join('/')

      if (entry.type === 'Link') {
        const linkparts = entry.linkpath.split(/\/|\\/)
        if (linkparts.length >= this.strip)
          entry.linkpath = linkparts.slice(this.strip).join('/')
      }
    }

    if (!this.preservePaths) {
      const p = entry.path
      if (p.match(/(^|\/|\\)\.\.(\\|\/|$)/)) {
        this.warn('TAR_ENTRY_ERROR', `path contains '..'`, {
          entry,
          path: p,
        })
        return false
      }

      // absolutes on posix are also absolutes on win32
      // so we only need to test this one to get both
      if (path.win32.isAbsolute(p)) {
        const parsed = path.win32.parse(p)
        entry.path = p.substr(parsed.root.length)
        const r = parsed.root
        this.warn('TAR_ENTRY_INFO', `stripping ${r} from absolute path`, {
          entry,
          path: p,
        })
      }
    }

    // only encode : chars that aren't drive letter indicators
    if (this.win32) {
      const parsed = path.win32.parse(entry.path)
      entry.path = parsed.root === '' ? wc.encode(entry.path)
        : parsed.root + wc.encode(entry.path.substr(parsed.root.length))
    }

    if (path.isAbsolute(entry.path))
      entry.absolute = entry.path
    else
      entry.absolute = path.resolve(this.cwd, entry.path)

    return true
  }

  [ONENTRY] (entry) {
    if (!this[CHECKPATH](entry))
      return entry.resume()

    assert.equal(typeof entry.absolute, 'string')

    switch (entry.type) {
      case 'Directory':
      case 'GNUDumpDir':
        if (entry.mode)
          entry.mode = entry.mode | 0o700

      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
      case 'Link':
      case 'SymbolicLink':
        return this[CHECKFS](entry)

      case 'CharacterDevice':
      case 'BlockDevice':
      case 'FIFO':
      default:
        return this[UNSUPPORTED](entry)
    }
  }

  [ONERROR] (er, entry) {
    // Cwd has to exist, or else nothing works. That's serious.
    // Other errors are warnings, which raise the error in strict
    // mode, but otherwise continue on.
    if (er.name === 'CwdError')
      this.emit('error', er)
    else {
      this.warn('TAR_ENTRY_ERROR', er, {entry})
      this[UNPEND]()
      entry.resume()
    }
  }

  [MKDIR] (dir, mode, cb) {
    mkdir(dir, {
      uid: this.uid,
      gid: this.gid,
      processUid: this.processUid,
      processGid: this.processGid,
      umask: this.processUmask,
      preserve: this.preservePaths,
      unlink: this.unlink,
      cache: this.dirCache,
      cwd: this.cwd,
      mode: mode,
      noChmod: this.noChmod,
    }, cb)
  }

  [DOCHOWN] (entry) {
    // in preserve owner mode, chown if the entry doesn't match process
    // in set owner mode, chown if setting doesn't match process
    return this.forceChown ||
      this.preserveOwner &&
      (typeof entry.uid === 'number' && entry.uid !== this.processUid ||
        typeof entry.gid === 'number' && entry.gid !== this.processGid)
      ||
      (typeof this.uid === 'number' && this.uid !== this.processUid ||
        typeof this.gid === 'number' && this.gid !== this.processGid)
  }

  [UID] (entry) {
    return uint32(this.uid, entry.uid, this.processUid)
  }

  [GID] (entry) {
    return uint32(this.gid, entry.gid, this.processGid)
  }

  [FILE] (entry, fullyDone) {
    const mode = entry.mode & 0o7777 || this.fmode
    const stream = new fsm.WriteStream(entry.absolute, {
      flags: getFlag(entry.size),
      mode: mode,
      autoClose: false,
    })
    stream.on('error', er => this[ONERROR](er, entry))

    let actions = 1
    const done = er => {
      if (er)
        return this[ONERROR](er, entry)

      if (--actions === 0) {
        fs.close(stream.fd, er => {
          fullyDone()
          er ? this[ONERROR](er, entry) : this[UNPEND]()
        })
      }
    }

    stream.on('finish', _ => {
      // if futimes fails, try utimes
      // if utimes fails, fail with the original error
      // same for fchown/chown
      const abs = entry.absolute
      const fd = stream.fd

      if (entry.mtime && !this.noMtime) {
        actions++
        const atime = entry.atime || new Date()
        const mtime = entry.mtime
        fs.futimes(fd, atime, mtime, er =>
          er ? fs.utimes(abs, atime, mtime, er2 => done(er2 && er))
          : done())
      }

      if (this[DOCHOWN](entry)) {
        actions++
        const uid = this[UID](entry)
        const gid = this[GID](entry)
        fs.fchown(fd, uid, gid, er =>
          er ? fs.chown(abs, uid, gid, er2 => done(er2 && er))
          : done())
      }

      done()
    })

    const tx = this.transform ? this.transform(entry) || entry : entry
    if (tx !== entry) {
      tx.on('error', er => this[ONERROR](er, entry))
      entry.pipe(tx)
    }
    tx.pipe(stream)
  }

  [DIRECTORY] (entry, fullyDone) {
    const mode = entry.mode & 0o7777 || this.dmode
    this[MKDIR](entry.absolute, mode, er => {
      if (er) {
        fullyDone()
        return this[ONERROR](er, entry)
      }

      let actions = 1
      const done = _ => {
        if (--actions === 0) {
          fullyDone()
          this[UNPEND]()
          entry.resume()
        }
      }

      if (entry.mtime && !this.noMtime) {
        actions++
        fs.utimes(entry.absolute, entry.atime || new Date(), entry.mtime, done)
      }

      if (this[DOCHOWN](entry)) {
        actions++
        fs.chown(entry.absolute, this[UID](entry), this[GID](entry), done)
      }

      done()
    })
  }

  [UNSUPPORTED] (entry) {
    entry.unsupported = true
    this.warn('TAR_ENTRY_UNSUPPORTED',
      `unsupported entry type: ${entry.type}`, {entry})
    entry.resume()
  }

  [SYMLINK] (entry, done) {
    this[LINK](entry, entry.linkpath, 'symlink', done)
  }

  [HARDLINK] (entry, done) {
    this[LINK](entry, path.resolve(this.cwd, entry.linkpath), 'link', done)
  }

  [PEND] () {
    this[PENDING]++
  }

  [UNPEND] () {
    this[PENDING]--
    this[MAYBECLOSE]()
  }

  [SKIP] (entry) {
    this[UNPEND]()
    entry.resume()
  }

  // Check if we can reuse an existing filesystem entry safely and
  // overwrite it, rather than unlinking and recreating
  // Windows doesn't report a useful nlink, so we just never reuse entries
  [ISREUSABLE] (entry, st) {
    return entry.type === 'File' &&
      !this.unlink &&
      st.isFile() &&
      st.nlink <= 1 &&
      process.platform !== 'win32'
  }

  // check if a thing is there, and if so, try to clobber it
  [CHECKFS] (entry) {
    this[PEND]()
    const paths = [entry.path]
    if (entry.linkpath)
      paths.push(entry.linkpath)
    this.reservations.reserve(paths, done => this[CHECKFS2](entry, done))
  }

  [CHECKFS2] (entry, done) {
    this[MKDIR](path.dirname(entry.absolute), this.dmode, er => {
      if (er) {
        done()
        return this[ONERROR](er, entry)
      }
      fs.lstat(entry.absolute, (er, st) => {
        if (st && (this.keep || this.newer && st.mtime > entry.mtime)) {
          this[SKIP](entry)
          done()
        } else if (er || this[ISREUSABLE](entry, st))
          this[MAKEFS](null, entry, done)

        else if (st.isDirectory()) {
          if (entry.type === 'Directory') {
            if (!this.noChmod && (!entry.mode || (st.mode & 0o7777) === entry.mode))
              this[MAKEFS](null, entry, done)
            else {
              fs.chmod(entry.absolute, entry.mode,
                er => this[MAKEFS](er, entry, done))
            }
          } else
            fs.rmdir(entry.absolute, er => this[MAKEFS](er, entry, done))
        } else
          unlinkFile(entry.absolute, er => this[MAKEFS](er, entry, done))
      })
    })
  }

  [MAKEFS] (er, entry, done) {
    if (er)
      return this[ONERROR](er, entry)

    switch (entry.type) {
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
        return this[FILE](entry, done)

      case 'Link':
        return this[HARDLINK](entry, done)

      case 'SymbolicLink':
        return this[SYMLINK](entry, done)

      case 'Directory':
      case 'GNUDumpDir':
        return this[DIRECTORY](entry, done)
    }
  }

  [LINK] (entry, linkpath, link, done) {
    // XXX: get the type ('file' or 'dir') for windows
    fs[link](linkpath, entry.absolute, er => {
      if (er)
        return this[ONERROR](er, entry)
      done()
      this[UNPEND]()
      entry.resume()
    })
  }
}

class UnpackSync extends Unpack {
  [CHECKFS] (entry) {
    const er = this[MKDIR](path.dirname(entry.absolute), this.dmode, neverCalled)
    if (er)
      return this[ONERROR](er, entry)
    try {
      const st = fs.lstatSync(entry.absolute)
      if (this.keep || this.newer && st.mtime > entry.mtime)
        return this[SKIP](entry)
      else if (this[ISREUSABLE](entry, st))
        return this[MAKEFS](null, entry, neverCalled)
      else {
        try {
          if (st.isDirectory()) {
            if (entry.type === 'Directory') {
              if (!this.noChmod && entry.mode && (st.mode & 0o7777) !== entry.mode)
                fs.chmodSync(entry.absolute, entry.mode)
            } else
              fs.rmdirSync(entry.absolute)
          } else
            unlinkFileSync(entry.absolute)
          return this[MAKEFS](null, entry, neverCalled)
        } catch (er) {
          return this[ONERROR](er, entry)
        }
      }
    } catch (er) {
      return this[MAKEFS](null, entry, neverCalled)
    }
  }

  [FILE] (entry, _) {
    const mode = entry.mode & 0o7777 || this.fmode

    const oner = er => {
      let closeError
      try {
        fs.closeSync(fd)
      } catch (e) {
        closeError = e
      }
      if (er || closeError)
        this[ONERROR](er || closeError, entry)
    }

    let fd
    try {
      fd = fs.openSync(entry.absolute, getFlag(entry.size), mode)
    } catch (er) {
      return oner(er)
    }
    const tx = this.transform ? this.transform(entry) || entry : entry
    if (tx !== entry) {
      tx.on('error', er => this[ONERROR](er, entry))
      entry.pipe(tx)
    }

    tx.on('data', chunk => {
      try {
        fs.writeSync(fd, chunk, 0, chunk.length)
      } catch (er) {
        oner(er)
      }
    })

    tx.on('end', _ => {
      let er = null
      // try both, falling futimes back to utimes
      // if either fails, handle the first error
      if (entry.mtime && !this.noMtime) {
        const atime = entry.atime || new Date()
        const mtime = entry.mtime
        try {
          fs.futimesSync(fd, atime, mtime)
        } catch (futimeser) {
          try {
            fs.utimesSync(entry.absolute, atime, mtime)
          } catch (utimeser) {
            er = futimeser
          }
        }
      }

      if (this[DOCHOWN](entry)) {
        const uid = this[UID](entry)
        const gid = this[GID](entry)

        try {
          fs.fchownSync(fd, uid, gid)
        } catch (fchowner) {
          try {
            fs.chownSync(entry.absolute, uid, gid)
          } catch (chowner) {
            er = er || fchowner
          }
        }
      }

      oner(er)
    })
  }

  [DIRECTORY] (entry, _) {
    const mode = entry.mode & 0o7777 || this.dmode
    const er = this[MKDIR](entry.absolute, mode)
    if (er)
      return this[ONERROR](er, entry)
    if (entry.mtime && !this.noMtime) {
      try {
        fs.utimesSync(entry.absolute, entry.atime || new Date(), entry.mtime)
      } catch (er) {}
    }
    if (this[DOCHOWN](entry)) {
      try {
        fs.chownSync(entry.absolute, this[UID](entry), this[GID](entry))
      } catch (er) {}
    }
    entry.resume()
  }

  [MKDIR] (dir, mode) {
    try {
      return mkdir.sync(dir, {
        uid: this.uid,
        gid: this.gid,
        processUid: this.processUid,
        processGid: this.processGid,
        umask: this.processUmask,
        preserve: this.preservePaths,
        unlink: this.unlink,
        cache: this.dirCache,
        cwd: this.cwd,
        mode: mode,
      })
    } catch (er) {
      return er
    }
  }

  [LINK] (entry, linkpath, link, _) {
    try {
      fs[link + 'Sync'](linkpath, entry.absolute)
      entry.resume()
    } catch (er) {
      return this[ONERROR](er, entry)
    }
  }
}

Unpack.Sync = UnpackSync
module.exports = Unpack


/***/ }),

/***/ 4404:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";


// tar -u

const hlo = __nccwpck_require__(5274)
const r = __nccwpck_require__(5923)
// just call tar.r with the filter and mtimeCache

module.exports = (opt_, files, cb) => {
  const opt = hlo(opt_)

  if (!opt.file)
    throw new TypeError('file is required')

  if (opt.gzip)
    throw new TypeError('cannot append to compressed archives')

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  mtimeFilter(opt)
  return r(opt, files, cb)
}

const mtimeFilter = opt => {
  const filter = opt.filter

  if (!opt.mtimeCache)
    opt.mtimeCache = new Map()

  opt.filter = filter ? (path, stat) =>
    filter(path, stat) && !(opt.mtimeCache.get(path) > stat.mtime)
    : (path, stat) => !(opt.mtimeCache.get(path) > stat.mtime)
}


/***/ }),

/***/ 5899:
/***/ ((module) => {

"use strict";

module.exports = Base => class extends Base {
  warn (code, message, data = {}) {
    if (this.file)
      data.file = this.file
    if (this.cwd)
      data.cwd = this.cwd
    data.code = message instanceof Error && message.code || code
    data.tarCode = code
    if (!this.strict && data.recoverable !== false) {
      if (message instanceof Error) {
        data = Object.assign(message, data)
        message = message.message
      }
      this.emit('warn', data.tarCode, message, data)
    } else if (message instanceof Error)
      this.emit('error', Object.assign(message, data))
    else
      this.emit('error', Object.assign(new Error(`${code}: ${message}`), data))
  }
}


/***/ }),

/***/ 4808:
/***/ ((module) => {

"use strict";


// When writing files on Windows, translate the characters to their
// 0xf000 higher-encoded versions.

const raw = [
  '|',
  '<',
  '>',
  '?',
  ':',
]

const win = raw.map(char =>
  String.fromCharCode(0xf000 + char.charCodeAt(0)))

const toWin = new Map(raw.map((char, i) => [char, win[i]]))
const toRaw = new Map(win.map((char, i) => [char, raw[i]]))

module.exports = {
  encode: s => raw.reduce((s, c) => s.split(c).join(toWin.get(c)), s),
  decode: s => win.reduce((s, c) => s.split(c).join(toRaw.get(c)), s),
}


/***/ }),

/***/ 5450:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

const MiniPass = __nccwpck_require__(1077)
const Pax = __nccwpck_require__(7996)
const Header = __nccwpck_require__(6043)
const fs = __nccwpck_require__(5747)
const path = __nccwpck_require__(5622)

const maxReadSize = 16 * 1024 * 1024
const PROCESS = Symbol('process')
const FILE = Symbol('file')
const DIRECTORY = Symbol('directory')
const SYMLINK = Symbol('symlink')
const HARDLINK = Symbol('hardlink')
const HEADER = Symbol('header')
const READ = Symbol('read')
const LSTAT = Symbol('lstat')
const ONLSTAT = Symbol('onlstat')
const ONREAD = Symbol('onread')
const ONREADLINK = Symbol('onreadlink')
const OPENFILE = Symbol('openfile')
const ONOPENFILE = Symbol('onopenfile')
const CLOSE = Symbol('close')
const MODE = Symbol('mode')
const warner = __nccwpck_require__(5899)
const winchars = __nccwpck_require__(4808)

const modeFix = __nccwpck_require__(8371)

const WriteEntry = warner(class WriteEntry extends MiniPass {
  constructor (p, opt) {
    opt = opt || {}
    super(opt)
    if (typeof p !== 'string')
      throw new TypeError('path is required')
    this.path = p
    // suppress atime, ctime, uid, gid, uname, gname
    this.portable = !!opt.portable
    // until node has builtin pwnam functions, this'll have to do
    this.myuid = process.getuid && process.getuid()
    this.myuser = process.env.USER || ''
    this.maxReadSize = opt.maxReadSize || maxReadSize
    this.linkCache = opt.linkCache || new Map()
    this.statCache = opt.statCache || new Map()
    this.preservePaths = !!opt.preservePaths
    this.cwd = opt.cwd || process.cwd()
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.noMtime = !!opt.noMtime
    this.mtime = opt.mtime || null

    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    let pathWarn = false
    if (!this.preservePaths && path.win32.isAbsolute(p)) {
      // absolutes on posix are also absolutes on win32
      // so we only need to test this one to get both
      const parsed = path.win32.parse(p)
      this.path = p.substr(parsed.root.length)
      pathWarn = parsed.root
    }

    this.win32 = !!opt.win32 || process.platform === 'win32'
    if (this.win32) {
      this.path = winchars.decode(this.path.replace(/\\/g, '/'))
      p = p.replace(/\\/g, '/')
    }

    this.absolute = opt.absolute || path.resolve(this.cwd, p)

    if (this.path === '')
      this.path = './'

    if (pathWarn) {
      this.warn('TAR_ENTRY_INFO', `stripping ${pathWarn} from absolute path`, {
        entry: this,
        path: pathWarn + this.path,
      })
    }

    if (this.statCache.has(this.absolute))
      this[ONLSTAT](this.statCache.get(this.absolute))
    else
      this[LSTAT]()
  }

  [LSTAT] () {
    fs.lstat(this.absolute, (er, stat) => {
      if (er)
        return this.emit('error', er)
      this[ONLSTAT](stat)
    })
  }

  [ONLSTAT] (stat) {
    this.statCache.set(this.absolute, stat)
    this.stat = stat
    if (!stat.isFile())
      stat.size = 0
    this.type = getType(stat)
    this.emit('stat', stat)
    this[PROCESS]()
  }

  [PROCESS] () {
    switch (this.type) {
      case 'File': return this[FILE]()
      case 'Directory': return this[DIRECTORY]()
      case 'SymbolicLink': return this[SYMLINK]()
      // unsupported types are ignored.
      default: return this.end()
    }
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory', this.portable)
  }

  [HEADER] () {
    if (this.type === 'Directory' && this.portable)
      this.noMtime = true

    this.header = new Header({
      path: this.path,
      linkpath: this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this[MODE](this.stat.mode),
      uid: this.portable ? null : this.stat.uid,
      gid: this.portable ? null : this.stat.gid,
      size: this.stat.size,
      mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
      type: this.type,
      uname: this.portable ? null :
      this.stat.uid === this.myuid ? this.myuser : '',
      atime: this.portable ? null : this.stat.atime,
      ctime: this.portable ? null : this.stat.ctime,
    })

    if (this.header.encode() && !this.noPax) {
      this.write(new Pax({
        atime: this.portable ? null : this.header.atime,
        ctime: this.portable ? null : this.header.ctime,
        gid: this.portable ? null : this.header.gid,
        mtime: this.noMtime ? null : this.mtime || this.header.mtime,
        path: this.path,
        linkpath: this.linkpath,
        size: this.header.size,
        uid: this.portable ? null : this.header.uid,
        uname: this.portable ? null : this.header.uname,
        dev: this.portable ? null : this.stat.dev,
        ino: this.portable ? null : this.stat.ino,
        nlink: this.portable ? null : this.stat.nlink,
      }).encode())
    }
    this.write(this.header.block)
  }

  [DIRECTORY] () {
    if (this.path.substr(-1) !== '/')
      this.path += '/'
    this.stat.size = 0
    this[HEADER]()
    this.end()
  }

  [SYMLINK] () {
    fs.readlink(this.absolute, (er, linkpath) => {
      if (er)
        return this.emit('error', er)
      this[ONREADLINK](linkpath)
    })
  }

  [ONREADLINK] (linkpath) {
    this.linkpath = linkpath.replace(/\\/g, '/')
    this[HEADER]()
    this.end()
  }

  [HARDLINK] (linkpath) {
    this.type = 'Link'
    this.linkpath = path.relative(this.cwd, linkpath).replace(/\\/g, '/')
    this.stat.size = 0
    this[HEADER]()
    this.end()
  }

  [FILE] () {
    if (this.stat.nlink > 1) {
      const linkKey = this.stat.dev + ':' + this.stat.ino
      if (this.linkCache.has(linkKey)) {
        const linkpath = this.linkCache.get(linkKey)
        if (linkpath.indexOf(this.cwd) === 0)
          return this[HARDLINK](linkpath)
      }
      this.linkCache.set(linkKey, this.absolute)
    }

    this[HEADER]()
    if (this.stat.size === 0)
      return this.end()

    this[OPENFILE]()
  }

  [OPENFILE] () {
    fs.open(this.absolute, 'r', (er, fd) => {
      if (er)
        return this.emit('error', er)
      this[ONOPENFILE](fd)
    })
  }

  [ONOPENFILE] (fd) {
    const blockLen = 512 * Math.ceil(this.stat.size / 512)
    const bufLen = Math.min(blockLen, this.maxReadSize)
    const buf = Buffer.allocUnsafe(bufLen)
    this[READ](fd, buf, 0, buf.length, 0, this.stat.size, blockLen)
  }

  [READ] (fd, buf, offset, length, pos, remain, blockRemain) {
    fs.read(fd, buf, offset, length, pos, (er, bytesRead) => {
      if (er) {
        // ignoring the error from close(2) is a bad practice, but at
        // this point we already have an error, don't need another one
        return this[CLOSE](fd, () => this.emit('error', er))
      }
      this[ONREAD](fd, buf, offset, length, pos, remain, blockRemain, bytesRead)
    })
  }

  [CLOSE] (fd, cb) {
    fs.close(fd, cb)
  }

  [ONREAD] (fd, buf, offset, length, pos, remain, blockRemain, bytesRead) {
    if (bytesRead <= 0 && remain > 0) {
      const er = new Error('encountered unexpected EOF')
      er.path = this.absolute
      er.syscall = 'read'
      er.code = 'EOF'
      return this[CLOSE](fd, () => this.emit('error', er))
    }

    if (bytesRead > remain) {
      const er = new Error('did not encounter expected EOF')
      er.path = this.absolute
      er.syscall = 'read'
      er.code = 'EOF'
      return this[CLOSE](fd, () => this.emit('error', er))
    }

    // null out the rest of the buffer, if we could fit the block padding
    if (bytesRead === remain) {
      for (let i = bytesRead; i < length && bytesRead < blockRemain; i++) {
        buf[i + offset] = 0
        bytesRead++
        remain++
      }
    }

    const writeBuf = offset === 0 && bytesRead === buf.length ?
      buf : buf.slice(offset, offset + bytesRead)
    remain -= bytesRead
    blockRemain -= bytesRead
    pos += bytesRead
    offset += bytesRead

    this.write(writeBuf)

    if (!remain) {
      if (blockRemain)
        this.write(Buffer.alloc(blockRemain))
      return this[CLOSE](fd, er => er ? this.emit('error', er) : this.end())
    }

    if (offset >= length) {
      buf = Buffer.allocUnsafe(length)
      offset = 0
    }
    length = buf.length - offset
    this[READ](fd, buf, offset, length, pos, remain, blockRemain)
  }
})

class WriteEntrySync extends WriteEntry {
  [LSTAT] () {
    this[ONLSTAT](fs.lstatSync(this.absolute))
  }

  [SYMLINK] () {
    this[ONREADLINK](fs.readlinkSync(this.absolute))
  }

  [OPENFILE] () {
    this[ONOPENFILE](fs.openSync(this.absolute, 'r'))
  }

  [READ] (fd, buf, offset, length, pos, remain, blockRemain) {
    let threw = true
    try {
      const bytesRead = fs.readSync(fd, buf, offset, length, pos)
      this[ONREAD](fd, buf, offset, length, pos, remain, blockRemain, bytesRead)
      threw = false
    } finally {
      // ignoring the error from close(2) is a bad practice, but at
      // this point we already have an error, don't need another one
      if (threw) {
        try {
          this[CLOSE](fd, () => {})
        } catch (er) {}
      }
    }
  }

  [CLOSE] (fd, cb) {
    fs.closeSync(fd)
    cb()
  }
}

const WriteEntryTar = warner(class WriteEntryTar extends MiniPass {
  constructor (readEntry, opt) {
    opt = opt || {}
    super(opt)
    this.preservePaths = !!opt.preservePaths
    this.portable = !!opt.portable
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.noMtime = !!opt.noMtime

    this.readEntry = readEntry
    this.type = readEntry.type
    if (this.type === 'Directory' && this.portable)
      this.noMtime = true

    this.path = readEntry.path
    this.mode = this[MODE](readEntry.mode)
    this.uid = this.portable ? null : readEntry.uid
    this.gid = this.portable ? null : readEntry.gid
    this.uname = this.portable ? null : readEntry.uname
    this.gname = this.portable ? null : readEntry.gname
    this.size = readEntry.size
    this.mtime = this.noMtime ? null : opt.mtime || readEntry.mtime
    this.atime = this.portable ? null : readEntry.atime
    this.ctime = this.portable ? null : readEntry.ctime
    this.linkpath = readEntry.linkpath

    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    let pathWarn = false
    if (path.isAbsolute(this.path) && !this.preservePaths) {
      const parsed = path.parse(this.path)
      pathWarn = parsed.root
      this.path = this.path.substr(parsed.root.length)
    }

    this.remain = readEntry.size
    this.blockRemain = readEntry.startBlockSize

    this.header = new Header({
      path: this.path,
      linkpath: this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this.mode,
      uid: this.portable ? null : this.uid,
      gid: this.portable ? null : this.gid,
      size: this.size,
      mtime: this.noMtime ? null : this.mtime,
      type: this.type,
      uname: this.portable ? null : this.uname,
      atime: this.portable ? null : this.atime,
      ctime: this.portable ? null : this.ctime,
    })

    if (pathWarn) {
      this.warn('TAR_ENTRY_INFO', `stripping ${pathWarn} from absolute path`, {
        entry: this,
        path: pathWarn + this.path,
      })
    }

    if (this.header.encode() && !this.noPax) {
      super.write(new Pax({
        atime: this.portable ? null : this.atime,
        ctime: this.portable ? null : this.ctime,
        gid: this.portable ? null : this.gid,
        mtime: this.noMtime ? null : this.mtime,
        path: this.path,
        linkpath: this.linkpath,
        size: this.size,
        uid: this.portable ? null : this.uid,
        uname: this.portable ? null : this.uname,
        dev: this.portable ? null : this.readEntry.dev,
        ino: this.portable ? null : this.readEntry.ino,
        nlink: this.portable ? null : this.readEntry.nlink,
      }).encode())
    }

    super.write(this.header.block)
    readEntry.pipe(this)
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory', this.portable)
  }

  write (data) {
    const writeLen = data.length
    if (writeLen > this.blockRemain)
      throw new Error('writing more to entry than is appropriate')
    this.blockRemain -= writeLen
    return super.write(data)
  }

  end () {
    if (this.blockRemain)
      this.write(Buffer.alloc(this.blockRemain))
    return super.end()
  }
})

WriteEntry.Sync = WriteEntrySync
WriteEntry.Tar = WriteEntryTar

const getType = stat =>
  stat.isFile() ? 'File'
  : stat.isDirectory() ? 'Directory'
  : stat.isSymbolicLink() ? 'SymbolicLink'
  : 'Unsupported'

module.exports = WriteEntry


/***/ }),

/***/ 4091:
/***/ ((module) => {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ 665:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __nccwpck_require__(4091)(Yallist)
} catch (er) {}


/***/ }),

/***/ 2941:
/***/ ((module) => {

module.exports = eval("require")("original-fs");


/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");;

/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 4304:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");;

/***/ }),

/***/ 3867:
/***/ ((module) => {

"use strict";
module.exports = require("tty");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@actions/core/lib/core.js
var core = __nccwpck_require__(2186);
// EXTERNAL MODULE: ./node_modules/follow-redirects/index.js
var follow_redirects = __nccwpck_require__(7707);
// EXTERNAL MODULE: external "path"
var external_path_ = __nccwpck_require__(5622);
// EXTERNAL MODULE: ./node_modules/tar/index.js
var tar = __nccwpck_require__(4674);
;// CONCATENATED MODULE: external "child_process"
const external_child_process_namespaceObject = require("child_process");;
// EXTERNAL MODULE: ./node_modules/adm-zip/adm-zip.js
var adm_zip = __nccwpck_require__(6761);
var adm_zip_default = /*#__PURE__*/__nccwpck_require__.n(adm_zip);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __nccwpck_require__(5747);
// EXTERNAL MODULE: external "os"
var external_os_ = __nccwpck_require__(2087);
;// CONCATENATED MODULE: ./src/project-env-github-action.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








class ProjectEnvGithubAction {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const cliVersion = core.getInput('cli-version');
            const tempDir = this.createTempDir('project-env');
            try {
                const archive = yield this.downloadProjectEnvCliArchive(cliVersion, tempDir);
                this.extractProjectEnvCliArchive(archive, tempDir);
                const executable = this.resolveProjectEnvCliExecutable(tempDir);
                const allToolInfos = yield this.executeProjectEnvCli(executable);
                core.debug(`resulting tool infos: ${JSON.stringify(allToolInfos)}`);
                this.processToolInfos(allToolInfos);
            }
            catch (error) {
                core.setFailed(this.getErrorMessage(error));
            }
            finally {
                this.cleanTempDir(tempDir);
            }
        });
    }
    createTempDir(name) {
        return external_fs_.mkdtempSync(external_path_.join(external_os_.tmpdir(), `${name}-`));
    }
    cleanTempDir(tempDir) {
        try {
            external_fs_.rmdirSync(tempDir, { recursive: true });
        }
        catch (error) {
            core.debug(`failed to delete temporary directory ${tempDir}: ${error}`);
        }
    }
    downloadProjectEnvCliArchive(cliVersion, targetDirectory) {
        return __awaiter(this, void 0, void 0, function* () {
            const archiveBaseUrl = this.createProjectEnvCliArchiveBaseUrl(cliVersion);
            const archiveFilename = this.createProjectEnvCliArchiveFilename(cliVersion);
            const archiveUrl = `${archiveBaseUrl}/${archiveFilename}`;
            const targetFile = external_path_.join(targetDirectory, archiveFilename);
            core.debug(`downloading Project-Env CLI from ${archiveUrl} to ${targetFile}`);
            yield this.downloadArchive(archiveUrl, targetFile);
            return targetFile;
        });
    }
    createProjectEnvCliArchiveBaseUrl(cliVersion) {
        return `https://github.com/Project-Env/project-env-cli/releases/download/v${cliVersion}`;
    }
    createProjectEnvCliArchiveFilename(cliVersion) {
        const osName = this.getOsName();
        const fileExt = this.getFileExtension();
        return `cli-${cliVersion}-${osName}-amd64.${fileExt}`;
    }
    getOsName() {
        switch (external_os_.platform()) {
            case 'darwin':
                return 'macos';
            case 'linux':
                return 'linux';
            case 'win32':
                return 'windows';
            default:
                throw new Error(`unsupported OS ${external_os_.platform()}`);
        }
    }
    getFileExtension() {
        switch (external_os_.platform()) {
            case 'darwin':
            case 'linux':
                return 'tar.gz';
            case 'win32':
                return 'zip';
            default:
                throw new Error(`unsupported OS ${external_os_.platform()}`);
        }
    }
    downloadArchive(url, targetFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const writeStream = external_fs_.createWriteStream(targetFile);
            return new Promise((resolve, reject) => {
                core.debug(`downloading ${url} to ${targetFile}`);
                follow_redirects.https.get(url, response => {
                    if (response.statusCode !== 200) {
                        reject(`failed to download Project-Env CLI from URL ${url} (404)`);
                    }
                    const stream = response.pipe(writeStream);
                    stream.on('finish', () => resolve());
                }).on('error', e => {
                    reject(e.message);
                });
            });
        });
    }
    extractProjectEnvCliArchive(archiveFile, targetDirectory) {
        if (archiveFile.endsWith('zip')) {
            this.extractZipArchive(archiveFile, targetDirectory);
        }
        else {
            this.extractTarGzArchive(archiveFile, targetDirectory);
        }
    }
    extractZipArchive(archiveFile, targetDirectory) {
        new (adm_zip_default())(archiveFile).extractAllTo(targetDirectory);
    }
    extractTarGzArchive(archiveFile, targetDirectory) {
        tar.x({ file: archiveFile, C: targetDirectory, sync: true });
    }
    resolveProjectEnvCliExecutable(sourceDirectory) {
        const executableFilename = `project-env-cli${this.getExecutableExtension()}`;
        const executable = external_path_.join(sourceDirectory, executableFilename);
        if (!external_fs_.existsSync(executable)) {
            throw new Error(`could not find Project-Env CLI at ${executable}`);
        }
        return executable;
    }
    getExecutableExtension() {
        return external_os_.platform() === 'win32' ? '.exe' : '';
    }
    processToolInfos(allToolInfos) {
        for (const toolName of Object.keys(allToolInfos)) {
            const toolInfos = allToolInfos[toolName] || [];
            for (const toolInfo of toolInfos) {
                const pathElements = toolInfo.pathElements || [];
                for (const pathElement of pathElements) {
                    core.debug(`adding ${pathElement} to path`);
                    core.addPath(pathElement);
                }
                const environmentVariables = toolInfo.environmentVariables || {};
                for (const environmentVariableName of Object.keys(environmentVariables)) {
                    const environmentVariableValue = environmentVariables[environmentVariableName];
                    core.debug(`exporting variable ${environmentVariableName} with value ${environmentVariableValue}`);
                    core.exportVariable(environmentVariableName, environmentVariableValue);
                }
            }
        }
    }
    executeProjectEnvCli(executable) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var _a;
                const child = external_child_process_namespaceObject.execFile(executable, ['--config-file', 'project-env.toml'], (error, stdout) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(JSON.parse(stdout));
                    }
                });
                (_a = child.stderr) === null || _a === void 0 ? void 0 : _a.on('data', data => {
                    core.info(data.trim());
                });
            });
        });
    }
    getErrorMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        else {
            return error;
        }
    }
}

;// CONCATENATED MODULE: ./src/main.ts

new ProjectEnvGithubAction().run();

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map