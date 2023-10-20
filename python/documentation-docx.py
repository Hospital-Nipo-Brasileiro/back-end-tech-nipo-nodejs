from docx import Document
from docx.shared import Inches

d = Document()
d.add_picture('./assets/logotipo.jpg')

last_paragraph = d.paragraphs[-1]
last_paragraph.alignment = 1

d.add_paragraph()

p = d.add_paragraph('Acessos Corporativos')
run = p.runs[0]
run.bold = True
run.underline = True
p.alignment = 1
for run in p.runs:
    font = run.font
    font.name = 'Arial'
    font.size = Inches(0.19)

d.add_paragraph()

d.add_paragraph('                      Prezado (a),')

username = input('Type the username: ')

p_usernamed = d.add_paragraph(username)
run = p_usernamed.runs[0]
run.bold = True
p_usernamed.alignment = 1
for run in p_usernamed.runs:
    font = run.font
    font.name = 'Arial'
    font.size = Inches(0.19)

d.add_paragraph()
d.add_paragraph()

d.add_paragraph('     Em nome do departamento de Tecnologia da Informação, gostaríamos de lhe desejar boas-vindas e muito sucesso em nossa instituição.')
d.add_paragraph('     Abaixo compartilhamos os dados de acesso de algumas ferramentas que estão sob a gestão da T.I.:')
font = run.font
font.name = 'Arial'
font.size = Inches(0.13)

d.save('doc.docx')