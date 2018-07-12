"""Generated message classes for binaryauthorization version v1beta1.

"""
# NOTE: This file is autogenerated and should not be edited by hand.

from apitools.base.protorpclite import messages as _messages
from apitools.base.py import encoding


package = 'binaryauthorization'


class AdmissionRule(_messages.Message):
  r"""An admission rule specifies either that all container images used in a
  pod creation request must be attested to by one or more attestors, that all
  pod creations will be allowed, or that all pod creations will be denied.
  Images matching an admission whitelist pattern are exempted from admission
  rules and will never block a pod creation.

  Enums:
    EnforcementModeValueValuesEnum: Required. The action when a pod creation
      is denied by the admission rule.
    EvaluationModeValueValuesEnum: Required. How this admission rule will be
      evaluated.

  Fields:
    enforcementMode: Required. The action when a pod creation is denied by the
      admission rule.
    evaluationMode: Required. How this admission rule will be evaluated.
    requireAttestationsBy: Optional. The resource names of the attestors that
      must attest to a container image, in the format
      `projects/*/attestors/*`. Each attestor must exist before a policy can
      reference it.  To add an attestor to a policy the principal issuing the
      policy change request must be able to read the attestor resource.  Note:
      this field must be non-empty when the evaluation_mode field specifies
      REQUIRE_ATTESTATION, otherwise it must be empty.
  """

  class EnforcementModeValueValuesEnum(_messages.Enum):
    r"""Required. The action when a pod creation is denied by the admission
    rule.

    Values:
      ENFORCEMENT_MODE_UNSPECIFIED: Mandatory.
      ENFORCED_BLOCK_AND_AUDIT_LOG: Enforce the admission rule by blocking the
        pod creation.
      DRYRUN_AUDIT_LOG_ONLY: Dryrun mode: Audit logging only.  This will allow
        the pod creation as if the admission request had specified break-
        glass.
    """
    ENFORCEMENT_MODE_UNSPECIFIED = 0
    ENFORCED_BLOCK_AND_AUDIT_LOG = 1
    DRYRUN_AUDIT_LOG_ONLY = 2

  class EvaluationModeValueValuesEnum(_messages.Enum):
    r"""Required. How this admission rule will be evaluated.

    Values:
      EVALUATION_MODE_UNSPECIFIED: Mandatory.
      ALWAYS_ALLOW: This rule allows all all pod creations.
      REQUIRE_ATTESTATION: This rule allows a pod creation if all the
        attestors listed in 'require_attestations_by' have valid attestations
        for all of the images in the pod spec.
      ALWAYS_DENY: This rule denies all pod creations.
    """
    EVALUATION_MODE_UNSPECIFIED = 0
    ALWAYS_ALLOW = 1
    REQUIRE_ATTESTATION = 2
    ALWAYS_DENY = 3

  enforcementMode = _messages.EnumField('EnforcementModeValueValuesEnum', 1)
  evaluationMode = _messages.EnumField('EvaluationModeValueValuesEnum', 2)
  requireAttestationsBy = _messages.StringField(3, repeated=True)


class AdmissionWhitelistPattern(_messages.Message):
  r"""An admission whitelist pattern exempts images from checks by admission
  rules.

  Fields:
    namePattern: An image name pattern to whitelist, in the form
      `registry/path/to/image`. This supports a trailing `*` as a wildcard,
      but this is allowed only in text after the `registry/` part.
  """

  namePattern = _messages.StringField(1)


class Attestor(_messages.Message):
  r"""An attestor that attests to container image artifacts. An existing
  attestor cannot be modified except where indicated.

  Fields:
    description: Optional. A descriptive comment.  This field may be updated.
      The field may be displayed in chooser dialogs.
    name: Required. The resource name, in the format:
      `projects/*/attestors/*`. This field may not be updated.
    updateTime: Output only. Time when the attestor was last updated.
    userOwnedDrydockNote: A Drydock ATTESTATION_AUTHORITY Note, created by the
      user.
  """

  description = _messages.StringField(1)
  name = _messages.StringField(2)
  updateTime = _messages.StringField(3)
  userOwnedDrydockNote = _messages.MessageField('UserOwnedDrydockNote', 4)


class AttestorPublicKey(_messages.Message):
  r"""An attestator public key that will be used to verify attestations signed
  by this attestor.

  Fields:
    asciiArmoredPgpPublicKey: ASCII-armored representation of a PGP public
      key, as the entire output by the command `gpg --export --armor
      foo@example.com` (either LF or CRLF line endings).
    comment: Optional. A descriptive comment. This field may be updated.
    id: Output only. This field will be overwritten with key ID information,
      for example, an identifier extracted from a PGP public key. This field
      may not be updated.
  """

  asciiArmoredPgpPublicKey = _messages.StringField(1)
  comment = _messages.StringField(2)
  id = _messages.StringField(3)


class BinaryauthorizationProjectsAttestorsCreateRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsAttestorsCreateRequest object.

  Fields:
    attestor: A Attestor resource to be passed as the request body.
    attestorId: Required. The attestors ID.
    parent: Required. The parent of this attestor.
  """

  attestor = _messages.MessageField('Attestor', 1)
  attestorId = _messages.StringField(2)
  parent = _messages.StringField(3, required=True)


class BinaryauthorizationProjectsAttestorsDeleteRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsAttestorsDeleteRequest object.

  Fields:
    name: Required. The name of the attestors to delete, in the format
      `projects/*/attestors/*`.
  """

  name = _messages.StringField(1, required=True)


class BinaryauthorizationProjectsAttestorsGetIamPolicyRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsAttestorsGetIamPolicyRequest object.

  Fields:
    resource: REQUIRED: The resource for which the policy is being requested.
      See the operation documentation for the appropriate value for this
      field.
  """

  resource = _messages.StringField(1, required=True)


class BinaryauthorizationProjectsAttestorsGetRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsAttestorsGetRequest object.

  Fields:
    name: Required. The name of the attestor to retrieve, in the format
      `projects/*/attestors/*`.
  """

  name = _messages.StringField(1, required=True)


class BinaryauthorizationProjectsAttestorsListRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsAttestorsListRequest object.

  Fields:
    pageSize: Requested page size. The server may return fewer results than
      requested. If unspecified, the server will pick an appropriate default.
    pageToken: A token identifying a page of results the server should return.
      Typically, this is the value of ListAttestorsResponse.next_page_token
      returned from the previous call to the `ListAttestors` method.
    parent: Required. The resource name of the project associated with the
      attestors, in the format `projects/*`.
  """

  pageSize = _messages.IntegerField(1, variant=_messages.Variant.INT32)
  pageToken = _messages.StringField(2)
  parent = _messages.StringField(3, required=True)


class BinaryauthorizationProjectsAttestorsSetIamPolicyRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsAttestorsSetIamPolicyRequest object.

  Fields:
    resource: REQUIRED: The resource for which the policy is being specified.
      See the operation documentation for the appropriate value for this
      field.
    setIamPolicyRequest: A SetIamPolicyRequest resource to be passed as the
      request body.
  """

  resource = _messages.StringField(1, required=True)
  setIamPolicyRequest = _messages.MessageField('SetIamPolicyRequest', 2)


class BinaryauthorizationProjectsAttestorsTestIamPermissionsRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsAttestorsTestIamPermissionsRequest object.

  Fields:
    resource: REQUIRED: The resource for which the policy detail is being
      requested. See the operation documentation for the appropriate value for
      this field.
    testIamPermissionsRequest: A TestIamPermissionsRequest resource to be
      passed as the request body.
  """

  resource = _messages.StringField(1, required=True)
  testIamPermissionsRequest = _messages.MessageField('TestIamPermissionsRequest', 2)


class BinaryauthorizationProjectsGetPolicyRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsGetPolicyRequest object.

  Fields:
    name: Required. The resource name of the policy to retrieve, in the format
      `projects/*/policy`.
  """

  name = _messages.StringField(1, required=True)


class BinaryauthorizationProjectsPolicyGetIamPolicyRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsPolicyGetIamPolicyRequest object.

  Fields:
    resource: REQUIRED: The resource for which the policy is being requested.
      See the operation documentation for the appropriate value for this
      field.
  """

  resource = _messages.StringField(1, required=True)


class BinaryauthorizationProjectsPolicySetIamPolicyRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsPolicySetIamPolicyRequest object.

  Fields:
    resource: REQUIRED: The resource for which the policy is being specified.
      See the operation documentation for the appropriate value for this
      field.
    setIamPolicyRequest: A SetIamPolicyRequest resource to be passed as the
      request body.
  """

  resource = _messages.StringField(1, required=True)
  setIamPolicyRequest = _messages.MessageField('SetIamPolicyRequest', 2)


class BinaryauthorizationProjectsPolicyTestIamPermissionsRequest(_messages.Message):
  r"""A BinaryauthorizationProjectsPolicyTestIamPermissionsRequest object.

  Fields:
    resource: REQUIRED: The resource for which the policy detail is being
      requested. See the operation documentation for the appropriate value for
      this field.
    testIamPermissionsRequest: A TestIamPermissionsRequest resource to be
      passed as the request body.
  """

  resource = _messages.StringField(1, required=True)
  testIamPermissionsRequest = _messages.MessageField('TestIamPermissionsRequest', 2)


class Binding(_messages.Message):
  r"""Associates `members` with a `role`.

  Fields:
    members: Specifies the identities requesting access for a Cloud Platform
      resource. `members` can have the following values:  * `allUsers`: A
      special identifier that represents anyone who is    on the internet;
      with or without a Google account.  * `allAuthenticatedUsers`: A special
      identifier that represents anyone    who is authenticated with a Google
      account or a service account.  * `user:{emailid}`: An email address that
      represents a specific Google    account. For example, `alice@gmail.com`
      .   * `serviceAccount:{emailid}`: An email address that represents a
      service    account. For example, `my-other-
      app@appspot.gserviceaccount.com`.  * `group:{emailid}`: An email address
      that represents a Google group.    For example, `admins@example.com`.
      * `domain:{domain}`: A Google Apps domain name that represents all the
      users of that domain. For example, `google.com` or `example.com`.
    role: Role that is assigned to `members`. For example, `roles/viewer`,
      `roles/editor`, or `roles/owner`. Required
  """

  members = _messages.StringField(1, repeated=True)
  role = _messages.StringField(2)


class Empty(_messages.Message):
  r"""A generic empty message that you can re-use to avoid defining duplicated
  empty messages in your APIs. A typical example is to use it as the request
  or the response type of an API method. For instance:      service Foo {
  rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The
  JSON representation for `Empty` is empty JSON object `{}`.
  """



class IamPolicy(_messages.Message):
  r"""Defines an Identity and Access Management (IAM) policy. It is used to
  specify access control policies for Cloud Platform resources.   A `Policy`
  consists of a list of `bindings`. A `binding` binds a list of `members` to a
  `role`, where the members can be user accounts, Google groups, Google
  domains, and service accounts. A `role` is a named list of permissions
  defined by IAM.  **JSON Example**      {       "bindings": [         {
  "role": "roles/owner",           "members": [
  "user:mike@example.com",             "group:admins@example.com",
  "domain:google.com",             "serviceAccount:my-other-
  app@appspot.gserviceaccount.com"           ]         },         {
  "role": "roles/viewer",           "members": ["user:sean@example.com"]
  }       ]     }  **YAML Example**      bindings:     - members:       -
  user:mike@example.com       - group:admins@example.com       -
  domain:google.com       - serviceAccount:my-other-
  app@appspot.gserviceaccount.com       role: roles/owner     - members:
  - user:sean@example.com       role: roles/viewer   For a description of IAM
  and its features, see the [IAM developer's
  guide](https://cloud.google.com/iam/docs).

  Fields:
    bindings: Associates a list of `members` to a `role`. `bindings` with no
      members will result in an error.
    etag: `etag` is used for optimistic concurrency control as a way to help
      prevent simultaneous updates of a policy from overwriting each other. It
      is strongly suggested that systems make use of the `etag` in the read-
      modify-write cycle to perform policy updates in order to avoid race
      conditions: An `etag` is returned in the response to `getIamPolicy`, and
      systems are expected to put that etag in the request to `setIamPolicy`
      to ensure that their change will be applied to the same version of the
      policy.  If no `etag` is provided in the call to `setIamPolicy`, then
      the existing policy is overwritten blindly.
    version: Deprecated.
  """

  bindings = _messages.MessageField('Binding', 1, repeated=True)
  etag = _messages.BytesField(2)
  version = _messages.IntegerField(3, variant=_messages.Variant.INT32)


class ListAttestorsResponse(_messages.Message):
  r"""Response message for BinauthzManagementService.ListAttestors][].

  Fields:
    attestors: The list of attestors.
    nextPageToken: A token to retrieve the next page of results. Pass this
      value in the ListAttestorsRequest.page_token field in the subsequent
      call to the `ListAttestors` method to retrieve the next page of results.
  """

  attestors = _messages.MessageField('Attestor', 1, repeated=True)
  nextPageToken = _messages.StringField(2)


class Policy(_messages.Message):
  r"""A policy for container image binary authorization.

  Messages:
    ClusterAdmissionRulesValue: Optional. Per-cluster admission rules. Cluster
      spec format: `location.clusterId`. There can be at most one admission
      rule per cluster spec. A `location` is either a compute zone (e.g. us-
      central1-a) or a region (e.g. us-central1). For `clusterId` syntax
      restrictions see https://cloud.google.com/container-
      engine/reference/rest/v1/projects.zones.clusters.

  Fields:
    admissionWhitelistPatterns: Optional. Admission policy whitelisting. A
      matching admission request will always be permitted. This feature is
      typically used to exclude Google or third-party infrastructure images
      from Binary Authorization policies.
    clusterAdmissionRules: Optional. Per-cluster admission rules. Cluster spec
      format: `location.clusterId`. There can be at most one admission rule
      per cluster spec. A `location` is either a compute zone (e.g. us-
      central1-a) or a region (e.g. us-central1). For `clusterId` syntax
      restrictions see https://cloud.google.com/container-
      engine/reference/rest/v1/projects.zones.clusters.
    defaultAdmissionRule: Required. Default admission rule for a cluster
      without a per-cluster admission rule.
    description: Optional. A descriptive comment.
    name: Output only. The resource name, in the format `projects/*/policy`.
      There is at most one policy per project.
    updateTime: Output only. Time when the policy was last updated.
  """

  @encoding.MapUnrecognizedFields('additionalProperties')
  class ClusterAdmissionRulesValue(_messages.Message):
    r"""Optional. Per-cluster admission rules. Cluster spec format:
    `location.clusterId`. There can be at most one admission rule per cluster
    spec. A `location` is either a compute zone (e.g. us-central1-a) or a
    region (e.g. us-central1). For `clusterId` syntax restrictions see
    https://cloud.google.com/container-
    engine/reference/rest/v1/projects.zones.clusters.

    Messages:
      AdditionalProperty: An additional property for a
        ClusterAdmissionRulesValue object.

    Fields:
      additionalProperties: Additional properties of type
        ClusterAdmissionRulesValue
    """

    class AdditionalProperty(_messages.Message):
      r"""An additional property for a ClusterAdmissionRulesValue object.

      Fields:
        key: Name of the additional property.
        value: A AdmissionRule attribute.
      """

      key = _messages.StringField(1)
      value = _messages.MessageField('AdmissionRule', 2)

    additionalProperties = _messages.MessageField('AdditionalProperty', 1, repeated=True)

  admissionWhitelistPatterns = _messages.MessageField('AdmissionWhitelistPattern', 1, repeated=True)
  clusterAdmissionRules = _messages.MessageField('ClusterAdmissionRulesValue', 2)
  defaultAdmissionRule = _messages.MessageField('AdmissionRule', 3)
  description = _messages.StringField(4)
  name = _messages.StringField(5)
  updateTime = _messages.StringField(6)


class SetIamPolicyRequest(_messages.Message):
  r"""Request message for `SetIamPolicy` method.

  Fields:
    policy: REQUIRED: The complete policy to be applied to the `resource`. The
      size of the policy is limited to a few 10s of KB. An empty policy is a
      valid policy but certain Cloud Platform services (such as Projects)
      might reject them.
  """

  policy = _messages.MessageField('IamPolicy', 1)


class StandardQueryParameters(_messages.Message):
  r"""Query parameters accepted by all methods.

  Enums:
    FXgafvValueValuesEnum: V1 error format.
    AltValueValuesEnum: Data format for response.

  Fields:
    f__xgafv: V1 error format.
    access_token: OAuth access token.
    alt: Data format for response.
    callback: JSONP
    fields: Selector specifying which fields to include in a partial response.
    key: API key. Your API key identifies your project and provides you with
      API access, quota, and reports. Required unless you provide an OAuth 2.0
      token.
    oauth_token: OAuth 2.0 token for the current user.
    prettyPrint: Returns response with indentations and line breaks.
    quotaUser: Available to use for quota purposes for server-side
      applications. Can be any arbitrary string assigned to a user, but should
      not exceed 40 characters.
    trace: A tracing token of the form "token:<tokenid>" to include in api
      requests.
    uploadType: Legacy upload protocol for media (e.g. "media", "multipart").
    upload_protocol: Upload protocol for media (e.g. "raw", "multipart").
  """

  class AltValueValuesEnum(_messages.Enum):
    r"""Data format for response.

    Values:
      json: Responses with Content-Type of application/json
      media: Media download with context-dependent Content-Type
      proto: Responses with Content-Type of application/x-protobuf
    """
    json = 0
    media = 1
    proto = 2

  class FXgafvValueValuesEnum(_messages.Enum):
    r"""V1 error format.

    Values:
      _1: v1 error format
      _2: v2 error format
    """
    _1 = 0
    _2 = 1

  f__xgafv = _messages.EnumField('FXgafvValueValuesEnum', 1)
  access_token = _messages.StringField(2)
  alt = _messages.EnumField('AltValueValuesEnum', 3, default=u'json')
  callback = _messages.StringField(4)
  fields = _messages.StringField(5)
  key = _messages.StringField(6)
  oauth_token = _messages.StringField(7)
  prettyPrint = _messages.BooleanField(8, default=True)
  quotaUser = _messages.StringField(9)
  trace = _messages.StringField(10)
  uploadType = _messages.StringField(11)
  upload_protocol = _messages.StringField(12)


class TestIamPermissionsRequest(_messages.Message):
  r"""Request message for `TestIamPermissions` method.

  Fields:
    permissions: The set of permissions to check for the `resource`.
      Permissions with wildcards (such as '*' or 'storage.*') are not allowed.
      For more information see [IAM
      Overview](https://cloud.google.com/iam/docs/overview#permissions).
  """

  permissions = _messages.StringField(1, repeated=True)


class TestIamPermissionsResponse(_messages.Message):
  r"""Response message for `TestIamPermissions` method.

  Fields:
    permissions: A subset of `TestPermissionsRequest.permissions` that the
      caller is allowed.
  """

  permissions = _messages.StringField(1, repeated=True)


class UserOwnedDrydockNote(_messages.Message):
  r"""An user owned drydock note references a Drydock ATTESTATION_AUTHORITY
  Note created by the user.

  Fields:
    noteReference: Required. The Drydock resource name of a
      ATTESTATION_AUTHORITY Note, created by the user, in the format:
      `projects/*/notes/*` (or the legacy `providers/*/notes/*`). This field
      may not be updated.  An attestation by this attestor is stored as a
      Drydock ATTESTATION_AUTHORITY Occurrence that names a container image
      and that links to this Note. Drydock is an external dependency.
    publicKeys: Optional. Public keys that verify attestations signed by this
      attestor.  This field may be updated.  If this field is non-empty, one
      of the specified public keys must verify that an attestation was signed
      by this attestor for the image specified in the admission request.  If
      this field is empty, this attestor always returns that no valid
      attestations exist.
  """

  noteReference = _messages.StringField(1)
  publicKeys = _messages.MessageField('AttestorPublicKey', 2, repeated=True)


encoding.AddCustomJsonFieldMapping(
    StandardQueryParameters, 'f__xgafv', '$.xgafv')
encoding.AddCustomJsonEnumMapping(
    StandardQueryParameters.FXgafvValueValuesEnum, '_1', '1')
encoding.AddCustomJsonEnumMapping(
    StandardQueryParameters.FXgafvValueValuesEnum, '_2', '2')
