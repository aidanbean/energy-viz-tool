All HHW and CHW tags follow standard naming convention and can be queried via Pi Web Interface: Building.Equipment_Type.Sensor_Type (Equipment_Type is always fixed, eg. “CHW” or “HHW”)
(ex): GIEDT.CHW.Outside Air Temp
(ex): MRAK.HHW.Pump 2 Speed

AHU tags are similar to HHW and CHW tags, but have one additional argument - Building.Equipment_Type.Equipment_Number.Sensor_Type. (Again, Equipment_Type is fixed to “AHU”, but Equipment_Number can take a number of different forms)
(ex): ACAD.AHU.AHU02.Economizer Mode
(ex): CHEMX.AHU.AHU0BN.Heating Valve Command
  
Zone tags follow a different naming convention: 
Building.Zone.Room_Number.Sensor_Type (Zone and Room_Number have many different forms and combinations)
(ex): YOUNG.AHU.AC1.Supply Air Temp Sp
(ex): OLS.AHU_SF01.RM224_MIX.Zone Day Night Mode

CHW Data: 558 possible unique Sensor_Types that can be queried
(ex): BTU_RETURNTEMP, Supply Air Pressure, etc….
HHW Data: 438 possible unique Sensor_Types
AHU Data: 265 possible Equipment_Numbers, 963 Possible Sensor_Types
Zone Data: 5207 possible unique combinations of Zone and Room_Number, and 1140 possible unique Sensor_Types.

Future - might be useful to get an organized list of various Zones, Room_Numbers, Equipment_Numbers, Sensors to see if we can make a pattern out of them. 
