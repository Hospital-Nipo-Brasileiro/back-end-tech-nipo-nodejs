import sys
from documentation_docx import createDoc

name = sys.argv[1]
access = sys.argv[2]
email = sys.argv[3]
username = sys.argv[4]
password = sys.argv[5]

# name = "Gustavo Fonseca"
# access = "MV, Conta de e-mail"
# email = "d@d.c"
# username = "eu"
# password = "123"

createDoc(name, access, email, username, password)
