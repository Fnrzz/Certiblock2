import { findProgramStudyById } from "./programStudy";

export const MakeJson = (data) => {
  const programStudy = findProgramStudyById(data.programStudy);
  const certificate = {
    documentType: "Certificate",
    diplomaNumber: data.diplomaNumber,
    issuingDate: data.issueDate,
    issuingInstitution: {
      name: "Universitas Muhammadiyah Surakarta",
      address:
        "Jl. A. Yani, Mendungan, Pabelan, Kec. Kartasura, Kabupaten Sukoharjo, Jawa Tengah 57162",
      website: "https://ums.ac.id",
    },
    studentDetails: {
      fullname: data.fullName,
      studentNumber: data.nim,
      studentNIK: data.nik,
      studentBirth: `${data.birthPlace}, ${data.birthDate}`,
    },
    academicDetails: {
      program: programStudy.program_study,
      faculty: programStudy.faculty,
      title: programStudy.title,
      accreditation: programStudy.accreditation,
      accreditationNumber: programStudy.accreditation_number,
      accreditationDate: programStudy.accreditation_date,
      graduationDate: data.graduationDate,
      academicYear: data.academicYear,
    },
    authorization: {
      rector: {
        name: "Prof. Dr. Harun Joko Prayitno, M.Hum.",
        nidn: "0028046501",
      },
      dean: {
        name: programStudy.dean.name,
        nidn: programStudy.dean.nidn,
      },
    },
  };

  return { data: certificate };
};
