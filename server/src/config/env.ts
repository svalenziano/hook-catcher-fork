import { SSMClient, GetParameterCommand, GetParametersByPathCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({ region: "use-east-1" })

/**
  https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ssm/command/GetParameterCommand/
 */
export async function getParam(name: string, decrypt=false) {
  const response = await ssm.send(new GetParameterCommand({
    Name: name,
    WithDecryption: decrypt
  }))
  return response.Parameter

}

