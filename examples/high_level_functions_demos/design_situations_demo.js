run("../includes/Tools/clearAll.js");

var design_situation = new DesignSituation();
design_situation.Accidental_EQU_PSI_1_1();
design_situation.PermanentAndTransient();
design_situation.Accidental_EQU_PSI_2_1();
design_situation.PermanentAndTransient_6_10();
design_situation.PermanentAndTransient6_10A_6_10B();
design_situation.Accidental_STR_PSI_1_1();
design_situation.Accidental_STR_PSI_2_1();
design_situation.Seismic_STR();
design_situation.Characteristic_STR();
design_situation.Frequent_SLS();
design_situation.Quasi_Permanent();
