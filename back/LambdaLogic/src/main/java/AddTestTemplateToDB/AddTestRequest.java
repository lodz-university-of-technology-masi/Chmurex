package AddTestTemplateToDB;

import java.util.List;

public class AddTestRequest {
    private String testID;
    private List<Question> questions;
    public String getTestID() {
        return testID;
    }

    public void setTestID(String testID) {
        this.testID = testID;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    private class Question{
        private String type;
        private String text;
        private List<String> anwsers;


        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public List<String> getAnwsers() {
            return anwsers;
        }

        public void setAnwsers(List<String> anwsers) {
            this.anwsers = anwsers;
        }
    }

}
