#!/bin/bash
cd Documents/DiseaseDetection
javac -cp mysql-connector-java-5.1.40-bin.jar ExportTxt.java
java -cp .:./mysql-connector-java-5.1.40-bin.jar ExportTxt
