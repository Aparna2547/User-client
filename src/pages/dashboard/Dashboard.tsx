import welcome from '../../assets/welcome.jpeg'
const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] w-full gap-2">
        <img src={welcome} width={300} alt="" />
        <h1 className="text-4xl text-center">WELCOME TO USER DASHBOARD</h1>
        <button className='px-3 py-2 bg-red-800 text-2xl font-semibold text-white rounded-md mt-3'>Logout</button>
    </div>
  )
}

export default Dashboard
