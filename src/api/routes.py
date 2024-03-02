from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
# from flask_bcrypt import Bcrypt

app = Flask(__name__)
# bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)

CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "¡Hola! Soy un mensaje que proviene del backend. Revisa la pestaña de red en el inspector de Google y verás la solicitud GET."
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data["email"]

    repetido = User.query.filter_by(email=email).first()
    if repetido:
        return jsonify({"error": "Este correo ya está registrado"}), 400

    # password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    password=data["password"]
    user = User(email=email, password=password, is_active=True)

    db.session.add(user)
    db.session.commit()
    return jsonify({"Registro exitoso"})

@api.route("/login", methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if not  data["password"]:
        return jsonify({"error": "Contraseña inválida"}), 401

    payload = {"email": user.email, "nivel": "user"}
    token = create_access_token(identity=user.id, additional_claims=payload)
    return jsonify({"token": token})

@api.route("/private", methods=["GET"])
@jwt_required()
def handle_private():
    
    return jsonify({"message": "Acceso permitido"}), 200
