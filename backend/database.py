from pymongo import MongoClient
from pymongo.server_api import ServerApi

# MongoDB Atlas URI provided by the user
URI = "mongodb+srv://pradeepsathish822_db_user:dwLrFrHiyU2IhlCL@cluster0.ftarsv1.mongodb.net/?appName=Cluster0"

class Database:
    client: MongoClient = None

    def connect(self):
        if self.client is None:
            self.client = MongoClient(URI, server_api=ServerApi('1'))
            try:
                self.client.admin.command('ping')
                print("Pinged your deployment. You successfully connected to MongoDB!")
            except Exception as e:
                print(e)

    def get_db(self):
        if self.client is None:
            self.connect()
        return self.client["mockello_mvp_db"]

    def close(self):
        if self.client:
            self.client.close()
            self.client = None

db = Database()

def get_database():
    return db.get_db()
