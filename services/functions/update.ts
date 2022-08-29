import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event:any) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: "123", // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },

    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },

    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});