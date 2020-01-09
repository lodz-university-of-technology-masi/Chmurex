package TestTemplateLambdas.TranslateTestTemplate;

import Common.DynamoDBAdapter;
import Common.GatewayResponse;
import Model.Test;
import Model.TestRequest;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.translate.AmazonTranslate;
import com.amazonaws.services.translate.AmazonTranslateClient;
import com.amazonaws.services.translate.model.TranslateTextRequest;
import com.amazonaws.services.translate.model.TranslateTextResult;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TranslateTestTemplate implements RequestHandler<TestRequest, GatewayResponse> {
    private String DYNAMODB_TABLE_NAME = "TestTemplates";
    AWSCredentialsProvider awsCreds = DefaultAWSCredentialsProviderChain.getInstance();
    private AmazonTranslate translator = AmazonTranslateClient.builder()
            .withCredentials(new AWSStaticCredentialsProvider(awsCreds.getCredentials()))
            .withRegion("us-east-1")
            .build();
    private DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
            .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(DYNAMODB_TABLE_NAME))
            .build();
    private DynamoDBMapper mapper = DynamoDBAdapter.getInstance(mapperConfig).getMapper();

    public GatewayResponse handleRequest(TestRequest request, Context context) {
        Test originalTest = mapper.load(Test.class, request.getID());
        JSONObject jsonObject = new JSONObject(originalTest.getJSON());
        String testName = request.getID().substring(0,request.getID().length()-2);
        String sourceLanguage = request.getID().substring(request.getID().length()-2);
        String targetLanguage = "EN";
        if(sourceLanguage.compareTo("EN") == 0){
            targetLanguage = "PL";
        }

        JSONObject translatedTest = new JSONObject();
        JSONObject translatedQuestions = new JSONObject();
        JSONObject questions = (JSONObject) jsonObject.get("Questions"+request.getID());
        JSONArray questionsArray = (JSONArray) questions.get("questions");
        StringBuilder sb = new StringBuilder();
        String returned = new String("");
        for(int i=0;i<questionsArray.length();i++)
        {

            JSONObject question = (JSONObject) questionsArray.getJSONObject(i).get("question");
            String text = question.getString("text");
            JSONArray answers = question.getJSONArray("answers");
            JSONArray translatedAnwsers = new JSONArray();
            for(int j=0;j<answers.length();j++)
            {
                String s = (String) answers.get(j);
                if(s.length()>0) {
                    TranslateTextRequest translateTextRequest = new TranslateTextRequest()
                    .withText(s)
                    .withSourceLanguageCode(sourceLanguage)
                    .withTargetLanguageCode(targetLanguage);
                TranslateTextResult translateTextResult = translator.translateText(translateTextRequest);
                translatedAnwsers.put(translateTextResult.getTranslatedText());
                }
            }
            sb.append(translatedAnwsers.toString());

            TranslateTextRequest translateTextRequest = new TranslateTextRequest()
                .withText(text)
                .withSourceLanguageCode(sourceLanguage)
                .withTargetLanguageCode(targetLanguage);
            TranslateTextResult translateTextResult = translator.translateText(translateTextRequest);
            String translatedText = translateTextResult.getTranslatedText();
            String type = question.getString("type");
            JSONObject translatedQuestion = new JSONObject();
            translatedQuestion.put("type",type);
            translatedQuestion.put("text",text);
            translatedQuestion.put("answers",answers);

           returned =translateTextResult.getTranslatedText();

        }
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new GatewayResponse(sb.toString(),headers,200);
    }
}

