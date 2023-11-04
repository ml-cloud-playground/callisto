import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import GridSearchCV
from sklearn import svm
from sklearn.metrics import classification_report
from nltk.tokenize import TweetTokenizer
import pickle
import time

dataframe = pd.read_csv(".//ml-data//emotion-labels-train.csv",encoding = "ISO-8859-1")
train,test = train_test_split(dataframe,test_size=0.2,stratify=dataframe.label)

#Count samples per class
dataframe.groupby("label").count()["text"]

tokenizer = TweetTokenizer()
pipe = Pipeline([
    ("tfidf",TfidfVectorizer(tokenizer=tokenizer.tokenize)),
    ("svm",svm.SVC())
])
parameters = {"tfidf__ngram_range" : [(1,2),(2,3)]
                  ,"tfidf__max_df":[0.5,0.8,0.95],
                  "tfidf__min_df":[1,2],
                  "tfidf__analyzer":["word"],
                  'svm__kernel':['rbf',"linear"],
                  'svm__C':[10,100,1000,10000]}
clf = GridSearchCV(pipe, parameters,cv=10,n_jobs=-1,verbose=1,scoring="f1_macro")
clf.fit(train.text, train.label)

print(classification_report(y_pred=clf.best_estimator_.predict(test.text),y_true=test.label))

# Create model file
time = str(time.time())
file = open('ml-models//model_' + time + '.p', 'wb+')
 
# dump model file
pickle.dump(clf, file)

# close the file
file.close()
