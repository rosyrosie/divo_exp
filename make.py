import os
import re

print("Version Example : 0.0.1, 1.2.3, 3.2.3, 4.5.2, ...")
p = re.compile('[0-9]+[.][0-9]+[.][0-9]+')
version = ""
while True:
    v = input("Enter the Version : ")
    if re.match(p, v):
        version = v
        break
os.system("docker build -t brighthonor/frontend_corp:"+version+" -t brighthonor/frontend_corp:latest"+" .")
os.system("docker push brighthonor/frontend_corp:"+version)
os.system("docker push brighthonor/frontend_corp:latest")
