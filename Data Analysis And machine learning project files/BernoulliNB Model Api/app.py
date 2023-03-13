import joblib as jb
import pandas as pd
from flask import Flask,request
from flask_cors import CORS
import sklearn
def get(is_tv_subscriber, subscription_age, remaining_contract, service_failure_count, download_avg):
    model = jb.load('BernoulliNBmodel.h5')
    df = pd.DataFrame(columns=jb.load('featuresnames.h5'))
    df.loc[0,'is_tv_subscriber'] = is_tv_subscriber
    df.loc[0, 'subscription_age'] = subscription_age
    df.loc[0, 'remaining_contract'] = remaining_contract
    df.loc[0, 'service_failure_count'] = service_failure_count
    df.loc[0, 'download_avg'] = download_avg
    prediction = str(model.predict(df)[0])
    return prediction

app = Flask(__name__)
CORS(app)
@app.route('/predict')
def index():
    args = request.args
    predicted = get(args.get('is_tv_subscriber'), args.get('subscription_age'), args.get('remaining_contract'), args.get('service_failure_count'), args.get('download_avg'))
    return predicted

@app.route('/')
def ind():
    return 'Add Queries to get a prediction response'
    
if __name__ == '__main__':
    app.run(debug=True)
