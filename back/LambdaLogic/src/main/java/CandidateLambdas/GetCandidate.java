package CandidateLambdas;


import Common.GatewayResponse;
import Model.CandidateRequest;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class GetCandidate implements RequestHandler<CandidateRequest, GatewayResponse> {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    public GatewayResponse handleRequest(CandidateRequest rq, Context context) {
        String username = rq.getUser();
        AdminGetUserRequest adminGetUserRequest = new AdminGetUserRequest()
                .withUserPoolId("us-east-1_Cb75QZCzu")
                .withUsername(username);
        AdminGetUserResult adminGetUserResult = cognito.adminGetUser(adminGetUserRequest);
        Map<String, String> map = new HashMap<>();
        List<AttributeType> attributes = adminGetUserResult.getUserAttributes();
        for (AttributeType attribute: attributes
             ) {
            map.put(attribute.getName(),attribute.getValue());
        }
        JSONObject json = new JSONObject(map);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new GatewayResponse(json.toString(), headers, 200);
    }

}