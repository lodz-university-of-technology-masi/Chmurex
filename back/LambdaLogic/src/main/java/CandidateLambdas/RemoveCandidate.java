package CandidateLambdas;


import Common.GatewayResponse;
import Model.CandidateRequest;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.HashMap;
import java.util.Map;
public class RemoveCandidate implements RequestHandler<CandidateRequest, GatewayResponse> {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    public GatewayResponse handleRequest(CandidateRequest rq, Context context) {
        String username = rq.getUser();
        AdminDeleteUserRequest adminDeleteUserRequest = new AdminDeleteUserRequest()
                .withUserPoolId("us-east-1_Cb75QZCzu")
                .withUsername(username);
        AdminDeleteUserResult adminDeleteUserResult = cognito.adminDeleteUser(adminDeleteUserRequest);
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new GatewayResponse("User" + username + " removed", headers, 200);
    }

}