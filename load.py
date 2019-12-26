import io

import flask

import numpy as np
import tensorflow as tf
# import keras
import cv2
from PIL import Image

app = flask.Flask(__name__)
model = None


def load_model():
    global model
    json_file = open('./model/model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    model = tf.keras.models.model_from_json(loaded_model_json)
    model.load_weights('./model/farmer.h5')

    print("Model loaded!")

    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])


def prepare_image(image):
    if image.mode != 'RGB':
        image = image.convert("RGB")

    image = np.array(image)[:, :, ::-1]
    image = cv2.resize(image, (128, 128))
    image = image.reshape(1, 128, 128, 3) / 255.

    return image


@app.route('/', methods=['GET'])
def index():
    return flask.render_template("index.html")


LABEL = ['Apple', 'Banana', 'Grape', 'Orange', 'Pineapple']


@app.route('/predict', methods=['POST'])
def predict():
    data = {'success': False}

    if flask.request.method == 'POST':
        if flask.request.files.get('image'):
            image = flask.request.files['image'].read()
            image = Image.open(io.BytesIO(image))

            image = prepare_image(image)
            result = model.predict(image)
            data['predictions'] = []

            label_i = result.argmax(axis=-1)[0]
            data['highest_probability'] = [str(LABEL[label_i]), str(result[0, label_i])]

            for i in range(5):
                data['predictions'].append(str(result[0, i]))

            data['success'] = True

    return flask.jsonify(data)


if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    load_model()
    app.run()
