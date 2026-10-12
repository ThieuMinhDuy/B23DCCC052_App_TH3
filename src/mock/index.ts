import {
  Student,
  Subject,
  ScheduleItem,
  Assignment,
  Grade,
  Semester,
} from '../types';

export const STUDENT_DATA: Student = {
  id: 'B23DCCC052',
  name: 'Thiều Minh Duy',
  className: 'D23CQCN01-B',
  major: 'Công nghệ thông tin',
  cohort: 'K2023',
  email: 'thieuminhduy@student.ptit.edu.vn',
  phone: '0912345678',
};

export const SUBJECTS_DATA: Subject[] = [
  {
    id: 'subj_01',
    code: 'RIPT1412',
    name: 'Phát triển ứng dụng di động đa nền tảng',
    credits: 3,
    instructor: 'Trần Quang Đại',
    group: '01',
    semester: 'HK1_2026_2027',
    description:
      'Môn học cung cấp kiến thức về phát triển ứng dụng di động đa nền tảng sử dụng React Native. Sinh viên sẽ học cách xây dựng giao diện, quản lý trạng thái, điều hướng và tích hợp API trong ứng dụng di động.',
  },
  {
    id: 'subj_02',
    code: 'INT1416',
    name: 'Đảm bảo chất lượng phần mềm',
    credits: 3,
    instructor: 'Phạm Đình Chung',
    group: '01',
    semester: 'HK1_2026_2027',
    description:
      'Môn học giới thiệu các phương pháp, kỹ thuật và công cụ đảm bảo chất lượng phần mềm bao gồm kiểm thử đơn vị, kiểm thử tích hợp, kiểm thử hệ thống và quản lý chất lượng trong quy trình phát triển phần mềm.',
  },
  {
    id: 'subj_03',
    code: 'INT1448',
    name: 'Phát triển phần mềm hướng dịch vụ',
    credits: 3,
    instructor: 'Nguyễn Việt Dũng',
    group: '01',
    semester: 'HK1_2026_2027',
    description:
      'Môn học cung cấp kiến thức về kiến trúc hướng dịch vụ (SOA), thiết kế và triển khai Web Services, RESTful API, microservices và các mẫu thiết kế phần mềm hướng dịch vụ.',
  },
  {
    id: 'subj_04',
    code: 'RIPT1411',
    name: 'Lập trình Web nâng cao',
    credits: 3,
    instructor: 'Ngô Văn Nhận',
    group: '02',
    semester: 'HK1_2026_2027',
    description:
      'Môn học trang bị kiến thức nâng cao về lập trình Web bao gồm framework phía server (Node.js, Express), framework phía client (React, Vue), xác thực, bảo mật, tối ưu hiệu suất và triển khai ứng dụng web.',
  },
  {
    id: 'subj_05',
    code: 'INT1340',
    name: 'Phân tích nghiệp vụ',
    credits: 3,
    instructor: 'Vũ Văn Thương',
    group: '01',
    semester: 'HK1_2026_2027',
    description:
      'Môn học cung cấp kiến thức và kỹ năng phân tích nghiệp vụ trong phát triển phần mềm, bao gồm thu thập yêu cầu, phân tích quy trình kinh doanh, mô hình hóa yêu cầu với UML và đặc tả yêu cầu phần mềm.',
  },
];

export const SCHEDULE_DATA: ScheduleItem[] = [

  {
    id: 'sch_01',
    subjectId: 'subj_04',
    subjectName: 'Lập trình Web nâng cao',
    dayOfWeek: 'monday',
    startTime: '09:00',
    endTime: '11:00',
    room: '101_HQV',
    instructor: 'Ngô Văn Nhận',
  },

  {
    id: 'sch_02',
    subjectId: 'subj_02',
    subjectName: 'Đảm bảo chất lượng phần mềm',
    dayOfWeek: 'tuesday',
    startTime: '07:00',
    endTime: '09:00',
    room: '102_HQV',
    instructor: 'Phạm Đình Chung',
  },
  {
    id: 'sch_03',
    subjectId: 'subj_03',
    subjectName: 'Phát triển phần mềm hướng dịch vụ',
    dayOfWeek: 'tuesday',
    startTime: '09:00',
    endTime: '11:00',
    room: '102_HQV',
    instructor: 'Nguyễn Việt Dũng',
  },

  {
    id: 'sch_04',
    subjectId: 'subj_01',
    subjectName: 'Phát triển ứng dụng di động đa nền tảng',
    dayOfWeek: 'wednesday',
    startTime: '07:00',
    endTime: '09:00',
    room: '101_HQV',
    instructor: 'Trần Quang Đại',
  },
  {
    id: 'sch_05',
    subjectId: 'subj_05',
    subjectName: 'Phân tích nghiệp vụ',
    dayOfWeek: 'wednesday',
    startTime: '09:00',
    endTime: '11:00',
    room: '102_HQV',
    instructor: 'Vũ Văn Thương',
  },
];

export const ASSIGNMENTS_DATA: Assignment[] = [

  {
    id: 'asgn_01',
    subjectId: 'subj_01',
    subjectName: 'Phát triển ứng dụng di động đa nền tảng',
    title: 'Bài thực hành 1: Giao diện cơ bản React Native',
    description:
      'Xây dựng ứng dụng React Native đơn giản với các component cơ bản: View, Text, Image, ScrollView, TextInput. Tạo giao diện trang cá nhân sinh viên.',
    requirements:
      'Nộp mã nguồn project React Native đầy đủ. Chụp ảnh màn hình kết quả chạy trên emulator. Viết báo cáo mô tả các component đã sử dụng.',
    deadline: '2026-10-08T23:59:00',
    status: 'completed',
  },
  {
    id: 'asgn_02',
    subjectId: 'subj_01',
    subjectName: 'Phát triển ứng dụng di động đa nền tảng',
    title: 'Bài thực hành 2: FlatList & Navigation',
    description:
      'Xây dựng ứng dụng danh sách sản phẩm sử dụng FlatList, tích hợp React Navigation với Stack Navigator và Bottom Tab Navigator.',
    requirements:
      'Nộp mã nguồn project. Ứng dụng phải có ít nhất 3 màn hình với điều hướng hoạt động. Viết báo cáo giải thích luồng điều hướng.',
    deadline: '2026-10-15T23:59:00',
    status: 'in_progress',
  },
  {
    id: 'asgn_03',
    subjectId: 'subj_01',
    subjectName: 'Phát triển ứng dụng di động đa nền tảng',
    title: 'Bài thực hành 3: Quản lý học tập',
    description:
      'Xây dựng ứng dụng quản lý học tập với đầy đủ chức năng: Dashboard, Môn học, Thời khóa biểu, Bài tập, Cá nhân. Sử dụng AsyncStorage để lưu trữ dữ liệu.',
    requirements:
      'Nộp mã nguồn hoàn chỉnh. Video demo ứng dụng chạy trên emulator hoặc thiết bị thật. Báo cáo chi tiết kiến trúc và chức năng.',
    deadline: '2026-10-25T23:59:00',
    status: 'pending',
  },

  {
    id: 'asgn_04',
    subjectId: 'subj_02',
    subjectName: 'Đảm bảo chất lượng phần mềm',
    title: 'Bài tập 1: Viết Test Case cho hệ thống đăng nhập',
    description:
      'Thiết kế bộ test case hoàn chỉnh cho chức năng đăng nhập hệ thống, bao gồm các trường hợp hợp lệ, không hợp lệ, biên và ngoại lệ.',
    requirements:
      'Nộp file Excel/Word chứa bảng test case đầy đủ các cột: ID, Mô tả, Tiền điều kiện, Bước thực hiện, Kết quả mong đợi, Kết quả thực tế, Trạng thái.',
    deadline: '2026-10-10T23:59:00',
    status: 'completed',
  },
  {
    id: 'asgn_05',
    subjectId: 'subj_02',
    subjectName: 'Đảm bảo chất lượng phần mềm',
    title: 'Bài tập 2: Kiểm thử đơn vị với JUnit',
    description:
      'Viết unit test cho module quản lý sinh viên sử dụng JUnit 5. Áp dụng các kỹ thuật kiểm thử: phân lớp tương đương, phân tích giá trị biên.',
    requirements:
      'Nộp project Java kèm các class test. Báo cáo coverage tối thiểu 80%. Giải thích chiến lược kiểm thử đã áp dụng.',
    deadline: '2026-10-18T23:59:00',
    status: 'pending',
  },

  {
    id: 'asgn_06',
    subjectId: 'subj_03',
    subjectName: 'Phát triển phần mềm hướng dịch vụ',
    title: 'Bài tập 1: Thiết kế RESTful API',
    description:
      'Thiết kế và triển khai RESTful API cho hệ thống quản lý thư viện sách sử dụng Node.js/Express hoặc Spring Boot. API hỗ trợ CRUD đầy đủ.',
    requirements:
      'Nộp mã nguồn backend. File Postman collection chứa các request mẫu. Tài liệu API (Swagger hoặc markdown).',
    deadline: '2026-10-12T23:59:00',
    status: 'in_progress',
  },
  {
    id: 'asgn_07',
    subjectId: 'subj_03',
    subjectName: 'Phát triển phần mềm hướng dịch vụ',
    title: 'Bài tập 2: Microservices Architecture',
    description:
      'Tách hệ thống monolithic thành kiến trúc microservices. Triển khai ít nhất 3 services giao tiếp qua REST API và message queue.',
    requirements:
      'Nộp mã nguồn các microservices. Sơ đồ kiến trúc hệ thống. Docker Compose file để chạy toàn bộ hệ thống. Báo cáo giải thích thiết kế.',
    deadline: '2026-10-30T23:59:00',
    status: 'pending',
  },

  {
    id: 'asgn_08',
    subjectId: 'subj_04',
    subjectName: 'Lập trình Web nâng cao',
    title: 'Bài tập 1: SPA với React & React Router',
    description:
      'Xây dựng Single Page Application quản lý tác vụ (To-Do) sử dụng React, React Router, và Context API để quản lý trạng thái.',
    requirements:
      'Nộp mã nguồn project React. Ứng dụng phải responsive, hỗ trợ CRUD tác vụ, phân loại và lọc. Deploy lên Vercel hoặc Netlify.',
    deadline: '2026-10-05T23:59:00',
    status: 'completed',
  },
  {
    id: 'asgn_09',
    subjectId: 'subj_04',
    subjectName: 'Lập trình Web nâng cao',
    title: 'Bài tập 2: Authentication với JWT',
    description:
      'Triển khai hệ thống xác thực sử dụng JWT (JSON Web Token) cho ứng dụng web. Bao gồm đăng ký, đăng nhập, refresh token và bảo vệ route.',
    requirements:
      'Nộp mã nguồn backend (Node.js/Express) và frontend (React). Viết tài liệu mô tả luồng xác thực và cách bảo mật token.',
    deadline: '2026-10-20T23:59:00',
    status: 'pending',
  },

  {
    id: 'asgn_10',
    subjectId: 'subj_05',
    subjectName: 'Phân tích nghiệp vụ',
    title: 'Bài tập 1: Phân tích quy trình nghiệp vụ',
    description:
      'Khảo sát và phân tích quy trình nghiệp vụ của một hệ thống quản lý bán hàng. Vẽ sơ đồ BPMN mô tả quy trình hiện tại (As-Is) và quy trình đề xuất (To-Be).',
    requirements:
      'Nộp báo cáo phân tích gồm: Mô tả quy trình, Sơ đồ BPMN (sử dụng Bizagi hoặc draw.io), Phân tích vấn đề và đề xuất cải tiến.',
    deadline: '2026-10-09T23:59:00',
    status: 'completed',
  },
  {
    id: 'asgn_11',
    subjectId: 'subj_05',
    subjectName: 'Phân tích nghiệp vụ',
    title: 'Bài tập 2: Đặc tả yêu cầu phần mềm (SRS)',
    description:
      'Viết tài liệu đặc tả yêu cầu phần mềm (SRS) cho hệ thống quản lý sinh viên. Bao gồm yêu cầu chức năng, phi chức năng, Use Case Diagram và đặc tả Use Case.',
    requirements:
      'Nộp tài liệu SRS theo chuẩn IEEE 830. Bao gồm Use Case Diagram, Activity Diagram cho các luồng chính. Tối thiểu 10 Use Case được đặc tả chi tiết.',
    deadline: '2026-10-22T23:59:00',
    status: 'in_progress',
  },
];

export const GRADES_DATA: Grade[] = [
  {
    id: 'grade_01',
    subjectId: 'subj_prev_01',
    subjectName: 'Lập trình hướng đối tượng',
    subjectCode: 'INT1341',
    credits: 3,
    attendanceScore: 9.0,
    midtermScore: 8.0,
    finalScore: 7.5,
    totalScore10: 7.85,
    totalScore4: 3.2,
    letterGrade: 'B+',
  },
  {
    id: 'grade_02',
    subjectId: 'subj_prev_02',
    subjectName: 'Cơ sở dữ liệu',
    subjectCode: 'INT1339',
    credits: 3,
    attendanceScore: 10.0,
    midtermScore: 8.5,
    finalScore: 8.0,
    totalScore10: 8.35,
    totalScore4: 3.5,
    letterGrade: 'A',
  },
  {
    id: 'grade_03',
    subjectId: 'subj_prev_03',
    subjectName: 'Mạng máy tính',
    subjectCode: 'INT1336',
    credits: 3,
    attendanceScore: 8.0,
    midtermScore: 7.0,
    finalScore: 6.5,
    totalScore10: 6.85,
    totalScore4: 2.5,
    letterGrade: 'C+',
  },
  {
    id: 'grade_04',
    subjectId: 'subj_prev_04',
    subjectName: 'Cấu trúc dữ liệu và giải thuật',
    subjectCode: 'INT1332',
    credits: 3,
    attendanceScore: 9.5,
    midtermScore: 9.0,
    finalScore: 8.5,
    totalScore10: 8.80,
    totalScore4: 3.7,
    letterGrade: 'A',
  },
  {
    id: 'grade_05',
    subjectId: 'subj_prev_05',
    subjectName: 'Lập trình Web cơ bản',
    subjectCode: 'RIPT1301',
    credits: 3,
    attendanceScore: 9.0,
    midtermScore: 7.5,
    finalScore: 7.0,
    totalScore10: 7.40,
    totalScore4: 3.0,
    letterGrade: 'B',
  },
  {
    id: 'grade_06',
    subjectId: 'subj_prev_06',
    subjectName: 'Kiến trúc máy tính',
    subjectCode: 'INT1310',
    credits: 3,
    attendanceScore: 8.5,
    midtermScore: 8.0,
    finalScore: 7.5,
    totalScore10: 7.80,
    totalScore4: 3.2,
    letterGrade: 'B+',
  },
];

