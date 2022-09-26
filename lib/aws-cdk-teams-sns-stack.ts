import * as cdk from 'aws-cdk-lib';
import { CfnParameter } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sns_subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';

export class AwsCdkTeamsSnsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const webhookUrl = new CfnParameter(this,"Teams Webhook URL", { type: "String", description: "The Target URL of the webhook" })

    const NotifierLambda = new lambda.Function(this,"TeamsNotifier",{
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("lib/teams_notifier"),
      handler: "lambda_function.lambda_handler",
      environment: { 'teamsURL': webhookUrl.valueAsString }
    })

  
    const snsTopic = new sns.Topic(this,"teamsTopic",{})
    snsTopic.addSubscription(new sns_subscriptions.LambdaSubscription(NotifierLambda))
  }
}
