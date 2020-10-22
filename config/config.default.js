const config = require('./config.global');

config.customer = 'default';

// Debug logging
// One of the supported default logging levels for winston - see https://github.com/winstonjs/winston#logging-levels
// config.debug.loggingLevel = 'debug';
config.debug.path = 'results/output';
config.debug.filename = `${config.customer}_${config.startTimestamp}.log`;

// Output path
config.output.path = 'results/output';
config.output.filename = `${config.customer}_entitlements_${config.startTimestamp}.json`;

// Report Generation Request
// Request
config.reportrequest = {};
// Timeout
config.reportrequest.timeout = 2000;

// Bearer Token
config.reportrequest.bearer = process.env.BEARER || null;
// Base URI to Percipio API
config.reportrequest.baseuri = process.env.EUDC
  ? 'https://dew1-api.percipio.com'
  : 'https://api.percipio.com';
// Request Path Parameters
config.reportrequest.path = {};
/**
 * Name: orgId
 * Description : Organization UUID
 * Required: true
 * Type: string
 * Format: uuid
 */
config.reportrequest.path.orgId = process.env.ORGID || null;

// Request Query string Parameters
config.reportrequest.query = {};

// Request Body
config.reportrequest.body = {};
/**
 * Name: start
 * Description : Start date for events retrieval
 * Type: string
 * Format: date-time
 * Example: 2018-01-01T10:10:24Z
 */
config.reportrequest.body.start = process.env.START || null;
/**
 * Name: end
 * Description : End date for events retrieval
 * Type: string
 * Format: date-time
 * Example: 2018-01-10T10:20:24Z
 */
config.reportrequest.body.end = process.env.END || null;
/**
 * Name: timeFrame
 * Description : To calculate the start/end date dynamically based on timeframe and when the
 * report is submitted date. [User can submit an absolute date range (start/end date) or a
 * relative date range (timeframe) but never both]
 * Type: string
 * Enum: DAY, WEEK, THIRTY_DAYS, CALENDAR_MONTH
 */
config.reportrequest.body.timeFrame = config.reportrequest.body.start
  ? null
  : process.env.TIMEFRAME || 'THIRTY_DAYS';
/**
 * Name: audience
 * Description : Audience filter, defaults to all
 * Type: string
 */
config.reportrequest.body.audience = 'ALL';
/**
 * Name: user
 * Description : Users filter, comma delimited and defaults to all
 * Type: string
 */
config.reportrequest.body.user = 'ALL';
/**
 * Name: collection
 * Description : Collection title filter, comma delimited and defaults to all
 * Type: string
 */
config.reportrequest.body.collection = 'ALL';
/**
 * Name: sort
 * Description : The field to use for sorting and which order to sort in, if sort is not
 * included the results will be returned ascending by collection
 * Type: object
 */
config.reportrequest.body.sort = {};

/**
 * Name: field
 * Type: string
 * Enum: collection, userId, firstName, lastName, emailAddress, entitledByAudience, consumed
 */
config.reportrequest.body.sort.field = 'collection';
/**
 * Name: order
 * Type: string
 * Enum: asc, desc
 */
config.reportrequest.body.sort.order = 'asc';
/**
 * Name: sftpId
 * Description : SFTP Id associated with OrgId
 * Type: string
 * Format: uuid
 */
config.reportrequest.body.sftpId = null;
/**
 * Name: isFileRequiredInSftp
 * Description : Generated files are required to deliver in the respected sftp location.
 * Default value is true.
 * Type: boolean
 */
config.reportrequest.body.isFileRequiredInSftp = false;
/**
 * Name: zip
 * Description : Generate the reports in zip file format. Default value is false.
 * Type: boolean
 */
config.reportrequest.body.zip = null;
/**
 * Name: encrypt
 * Description : Generate the report file as PGP encrypted file. Default value is false.
 * Type: boolean
 */
config.reportrequest.body.encrypt = null;
/**
 * Name: formatType
 * Description : Format Type, defaults to JSON, the value is extracted from Accept attribute
 * in header
 * Type: string
 * Enum: JSON, CSV, TXT
 */
config.reportrequest.body.formatType = 'JSON';
/**
 * Name: fileMask
 * Description : Absolute or masked pattern for the generated report file. Example file masks
 * - fileName_{DD}{MM}{YYYY}, fileName_{ORG_ID}
 * Type: string
 */
config.reportrequest.body.fileMask = null;
/**
 * Name: folderName
 * Description : custom folder under sftp reports wherein the generated report file is to be
 * placed.
 * Type: string
 */
config.reportrequest.body.folderName = null;
/**
 * Name: includeMillisInFilename
 * Description : Generate files with unix based timestamp. Example -
 * fileName.csv.1561642446608
 * Type: boolean
 */
config.reportrequest.body.includeMillisInFilename = null;

// Method
config.reportrequest.method = 'post';
// The Service Path
config.reportrequest.uri = `${config.reportrequest.baseuri}/reporting/v1/organizations/${config.reportrequest.path.orgId}/report-requests/entitlements`;

// Report Polling Request
config.pollrequest = {};
// Request Timeout
config.pollrequest.timeout = 2000;
// Bearer Token
config.pollrequest.bearer = process.env.BEARER || null;
// Base URI to Percipio API
config.pollrequest.baseuri = process.env.EUDC
  ? 'https://dew1-api.percipio.com'
  : 'https://api.percipio.com';
// Request Path Parameters
config.pollrequest.path = {};
/**
 * Name: orgId
 * Description : Organization UUID
 * Required: true
 * Type: string
 * Format: uuid
 */
config.pollrequest.path.orgId = process.env.ORGID || null;
/**
 * Name: reportRequestId
 * Description : Handle to access the report content
 * Required: true
 * Type: string
 */
config.pollrequest.path.reportRequestId = null;

// Request Query string Parameters
config.pollrequest.query = {};

// Request Body
config.pollrequest.body = null;

// Method
config.pollrequest.method = 'get';
// The Service Path
config.pollrequest.uri = `${config.pollrequest.baseuri}/reporting/v1/organizations/${config.pollrequest.path.orgId}/report-requests/${config.pollrequest.path.reportRequestId}`;

module.exports = config;
