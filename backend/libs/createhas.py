
import configparser
import hashlib

password = "admin"

passhash = hashlib.sha256(password.encode()).hexdigest()
config = configparser.ConfigParser()
config['PassHash'] = {'hash':passhash}
with open('hash.config','w') as configfile:
    config.write(configfile)