package CandidateLambdas;


import Common.GatewayResponse;
import Model.AddCandidateRequest;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.HashMap;
import java.util.Map;
public class AddCandidate implements RequestHandler<AddCandidateRequest, GatewayResponse> {
    private AWSCognitoIdentityProvider cognito = AWSCognitoIdentityProviderClientBuilder.defaultClient();

    public GatewayResponse handleRequest(AddCandidateRequest rq, Context context) {
        AdminCreateUserRequest createUserRequest = new AdminCreateUserRequest()
                .withUserPoolId("us-east-1_Cb75QZCzu")
                .withUsername(rq.getEmail())
                .withUserAttributes(
                    new AttributeType()
                        .withName("email")
                        .withValue(rq.getEmail()),
                    new AttributeType()
                            .withName("custom:isRecruiter")
                            .withValue("0"),
                    new AttributeType()
                            .withName("email_verified")
                            .withValue("true")
                );
        AdminCreateUserResult createUserResult =  cognito.adminCreateUser(createUserRequest);
        AdminSetUserPasswordRequest passwordRequest = new AdminSetUserPasswordRequest()
                .withUserPoolId("us-east-1_Cb75QZCzu")
                .withUsername(rq.getEmail())
                .withPassword(rq.getPassword())
                .withPermanent(true);
        AdminSetUserPasswordResult passwordResult = cognito.adminSetUserPassword(passwordRequest);

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");
        return new GatewayResponse("User " + rq.getEmail() +" created", headers, 200);
    }

}