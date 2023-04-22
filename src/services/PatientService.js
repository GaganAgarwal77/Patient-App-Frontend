import ApiService from "./ApiService";


const PATIENT_API_BASE_URL = '/patient';
const CITIES = '/cities';
class PatientService {

    getPatients() {
        return ApiService.getAll(PATIENT_API_BASE_URL + '/get-all-patients');
    }

    getPatientById(id) {
        return ApiService.getOneById(PATIENT_API_BASE_URL + '/get-details?patientID=' + id);
    }

    // fetchPatientByEmail(email) {
    //     return axios.get(PATIENT_API_BASE_URL + '/find-by-email/' + email);
    // }
    getPatientRecordsById(id){
        return ApiService.getOneById(PATIENT_API_BASE_URL + '/get-records-by-id?patientID=' + id)   
    }
    getRecordById(id){
        return ApiService.getOneById(PATIENT_API_BASE_URL + '/get-record?recordID=' + id)   
    }
    addPatientRecord(patientRecord){
        return ApiService.post(PATIENT_API_BASE_URL + '/add-record', patientRecord);
    }

    deletePatient(Id) {
        return ApiService.deleteById(PATIENT_API_BASE_URL + '/' + Id);
    }

    addPatient(patient) {
        return ApiService.post(PATIENT_API_BASE_URL + '/register', patient);
    }

    loginPatient(patient) {
        return ApiService.post(PATIENT_API_BASE_URL + '/login', patient);
    }

    getConsentRequests(id, token){
        return ApiService.getAuth('/consent/fetch?ehrbID=' + id, token)   
    }

    getVisitedHospitals(id, token){
        return ApiService.getAuth('/discovery/fetch-hospitals?ehrbID=' + id, token)   
    }

    getConsentRequestByTxnID(id, token){
        return ApiService.getAuth('/consent/fetch-by-txnID?txnID=' + id, token)
    }

    editPatient(patient) {
        return ApiService.put(PATIENT_API_BASE_URL + '/' + patient.id, patient);
    }
    getCities() {
        return ApiService.getAllDatas(PATIENT_API_BASE_URL+CITIES);
    }
}

export default new PatientService();