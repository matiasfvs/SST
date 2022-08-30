import { createRequire as topLevelCreateRequire } from 'module'
const require = topLevelCreateRequire(import.meta.url)
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/StorageStack.ts
import { Bucket, Table } from "@serverless-stack/resources";
function StorageStack({ stack, app }) {
  const bucket = new Bucket(stack, "Uploads");
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string"
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" }
  });
  return {
    table,
    bucket
  };
}
__name(StorageStack, "StorageStack");

// stacks/ApiStack.ts
import { Api, use } from "@serverless-stack/resources";
function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName
        }
      }
    },
    routes: {
      "POST /notes": "functions/create.main",
      "GET /notes/{id}": "functions/get.main",
      "GET /notes": "functions/list.main",
      "PUT /notes/{id}": "functions/update.main",
      "DELETE /notes/{id}": "functions/delete.main"
    }
  });
  stack.addOutputs({
    ApiEndpoint: api.url
  });
  return {
    api
  };
}
__name(ApiStack, "ApiStack");

// stacks/AuthStack.ts
import * as iam from "aws-cdk-lib/aws-iam";
import { Auth, use as use2 } from "@serverless-stack/resources";
function AuthStack({ stack, app }) {
  const { bucket } = use2(StorageStack);
  const { api } = use2(ApiStack);
  const auth = new Auth(stack, "Auth", {
    login: ["email"]
  });
  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*"
      ]
    })
  ]);
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId
  });
  return {
    auth
  };
}
__name(AuthStack, "AuthStack");

// stacks/index.ts
function stacks_default(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm"
    }
  });
  app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
}
__name(stacks_default, "default");
export {
  stacks_default as default
};
//# sourceMappingURL=index.js.map
