
import RegisterCard from "~/app/_lib/components/auth/register-card";
import SetSchedule from "~/app/lk/all-schedules/_lib/utils/set-schedule";
import { api } from "~/trpc/server";

// pages/auth/Register.tsx
// import { useState } from 'react';
// import { toast } from 'sonner';
// import { api } from '~/trpc/react';
// import { signIn } from 'next-auth/react';

const Register = async () => {
    const [groups, teachers] = await Promise.all([
        api.groups.get(),
        api.teachers.get()
    ])

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    // const [error, setError] = useState('');

    // const {mutateAsync: register} = api.auth.register.useMutation();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await register({name, email, password});

    //         await signIn('credentials', {
    //             email,
    //             password,
    //             callbackUrl: '/',
    //         });

    //         console.log(response);
    //         toast(JSON.stringify(response));

    //     } catch (error) {
    //         setError('Registration failed. Please try again.');
    //         console.error(error);
    //     }
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <SetSchedule groups={groups} teachers={teachers}>
                <RegisterCard />
            </SetSchedule>
            {/* <h1 className="text-2xl mb-4">Register</h1> */}
            {/* {error && <p className="text-red-600">{error}</p>} */}
            {/* <form onSubmit={handleSubmit} action="#">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border rounded w-full py-2 px-3"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Register
                </button>
            </form> */}
        </div>
    );
};

export default Register;