import {
 BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const MarkChart = ({ rawData }) => {
  
  const calculateSubjectAverage = (rawData)=>{
      const subjectTotals = {};
      const subjectCounts = {};

      rawData.forEach((student)=>{
        student.marks.forEach(({subject,score})=>{
          subjectTotals[subject] = (subjectTotals[subject] || 0)+score
          subjectCounts[subject] = (subjectCounts[subject] || 0 ) +1
        })
      })
      return Object.keys(subjectTotals).map((subject)=>({
        subject,
        average: parseFloat( (subjectTotals[subject]/subjectCounts[subject]).toFixed(2) ),
      }))
  }
  const data =calculateSubjectAverage(rawData)

  // const data = rawData.flatMap((student) =>
  //   student.marks.map((mark) => ({
  //     student: student.student_name,
  //     subject: mark.subject,
  //     score: mark.score,
  //   }))
  // );

  return (
     <div className="bg-white p-4 mt-6 shadow-md rounded-lg w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Average Marks by Subject</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis domain={[0, 100]} tickCount={11} />
          <Tooltip />
          <Bar dataKey="average" fill="#1E40AF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarkChart;
