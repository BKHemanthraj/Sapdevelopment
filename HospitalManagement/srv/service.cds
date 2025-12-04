

using { db } from '../db/Schema';

service MyService {

  @odata.draft.enabled
  entity Patients as projection on db.Patients;
  entity Visits   as projection on db.Visitor;
function Total(PatientID : String) returns Integer;
  function CreatePatient(
      PatientName  : String,
      PatientAge   : Integer,
      PatientPhone : String
  ) returns String;
    function CreatePatient_Draft(
      PatientName  : String,
      PatientAge   : Integer,
      PatientPhone : String
  ) returns String;
}