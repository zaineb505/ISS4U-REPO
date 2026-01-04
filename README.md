# Planificateur de Rendez-vous Patients

**Projet réalisé pour ISS4U | Technologies : Spring Boot, Angular, BPMN, TypeScript, XML, Camunda**  
**Période : [Indique la période si nécessaire]**

---

## Description

Ce projet vise à développer un **planificateur des rendez-vous patients** basé sur les processus métier d’un établissement de santé. Il facilite l’interaction entre les patients et le personnel médical en automatisant et fiabilisant l’affectation des examens médicaux.  

L’interface utilisateur est intuitive et réactive, permettant aux patients de réserver leurs rendez-vous facilement et au personnel médical de gérer les flux de réservation de manière efficace.

---

## Fonctionnalités principales

- **Gestion des rendez-vous** : création, modification et suppression des rendez-vous patients.  
- **Automatisation des processus métier** : modélisation et exécution des processus avec **BPMN** pour automatiser les flux de réservation et validation.  
- **Génération automatique de fichiers BPMN** : programme TypeScript pour traiter et générer des fichiers BPMN au format XML.  
- **Tests unitaires et fonctionnels** : assurance de la fiabilité et de la cohérence du système.  
- **Interface utilisateur intuitive** : facile à utiliser pour les patients et le personnel médical.  

---

## Technologies utilisées

- **Backend** : Spring Boot, Camunda BPMN  
- **Frontend** : Angular, TypeScript  
- **Modélisation et flux** : BPMN, XML  
- **Gestion de version** : Git/GitHub  

---
## Schéma explicatif du Système
<img width="658" height="312" alt="Capture d&#39;écran 2026-01-04 171042" src="https://github.com/user-attachments/assets/0a2fd96e-4138-4133-8266-f4c2af91de97" />
## Réalisation
<img width="1344" height="642" alt="add-patient" src="https://github.com/user-attachments/assets/896605eb-283f-4301-9528-4cffd7c8e003" />
![new-bpmn](https://github.com/user-attachments/assets/cc058177-3f40-471b-af64-36ab43721f37)
<img width="1349" height="642" alt="AddPatientSuccess" src="https://github.com/user-attachments/assets/c9626397-b089-48bb-b4c1-f5b0560faa57" />
<img width="673" height="337" alt="Capture d&#39;écran 2026-01-04 171147" src="https://github.com/user-attachments/assets/5e463d78-dd82-4ba9-8f08-5c37a74acb82" />
<img width="1341" height="660" alt="SelecterPatient" src="https://github.com/user-attachments/assets/7068326a-d1b9-41c4-aca2-67dd2479af36" />
<img width="1347" height="703" alt="SelectProcess" src="https://github.com/user-attachments/assets/6f3978b4-aa36-4d33-9072-4aceacfd6a58" />
<img width="1350" height="700" alt="testProcess1" src="https://github.com/user-attachments/assets/61765f11-7a85-4581-a4ed-72848653f2fc" />
<img width="1348" height="705" alt="testProcess2" src="https://github.com/user-attachments/assets/889abf1d-e324-455c-ac5f-9f00531a073c" />
<img width="1345" height="661" alt="DetailsProcess" src="https://github.com/user-attachments/assets/697ececa-6990-4c09-b44c-ae4a87959fa5" />
<img width="653" height="333" alt="Capture d&#39;écran 2026-01-04 174250" src="https://github.com/user-attachments/assets/f787c124-11bf-4e99-abd2-8fc682ccb84a" />

## Architecture du projet
```text
Planificateur-RV/
│
├── backend/ # Application Spring Boot pour la logique métier
│ ├── src/main/java/
│ └── src/main/resources/
│
├── frontend/ # Interface utilisateur Angular
│ ├── src/
│ └── angular.json
│
├── bpmn/ # Fichiers BPMN générés automatiquement
│
├── README.md # Documentation du projet
└── package.json
