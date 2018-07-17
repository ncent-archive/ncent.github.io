# Common SDK/API Error Codes


| Error Code | HTTP Status Code | User Message |
|----------------|---------------------------|---------------------------|
|------|Bad Request (400) |----------|
|hi| Forbidden (403) |hello|
|------|Not Found (404) |-----------|
|------|Method Not Allowed (405) |-----------|
|------|Conflict (409)|-----------|
| AccountAlreadyExists |Conflict (409)| This account already exists! |
| AccountBeingCreated |Conflict (409)| This account already is under creation! |
| Data too large | Bad Request (400) | The size of the specified data exceeds the maximum size permitted. | 
| EmptyMetadataKey | Bad Request (400) | The key for one of the metadata key-value pairs is empty. |
| InsufficientAccountPermissions | Forbidden (403)| The account being accessed does not have sufficient permissions to execute this operation. |
| InternalError | Internal Server Error (500) | The server encountered an internal error. Please retry the request. |
| InvalidFunction | Bad Request (400) |  Function does not exist in API/SDK. |
| InvalidInput | Bad Request (400) | One of the request inputs is not valid. | 
| InvalidRange | Request Range Not Satisfiable (400) | One of the request inputs is not valid or unsupported. |
| MissingRequiredQueryParameter | Bad Request (400) | A required query parameter was not specified for this request. |	 
| Not JSON Object | Bad Request (400) | Input is not a valid JSON object. |
| OperationTimedOut | Internal Server Error (500) | The operation could not be completed within the permitted time. | 
| OutOfRangeInput | Bad Request (400) | One of the request inputs is out of range. | 
| Resource Not Found | Not Found (404) | The specified resource does not exist. | 
| Server Busy | Service Unavailable (503) | The server is currently unable to receive requests. | 















