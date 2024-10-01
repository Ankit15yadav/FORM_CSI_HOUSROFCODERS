import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from "./ui/Button";
import { Input } from "./ui/input";
import { Label } from "./ui/Label";
import { Card, CardContent } from "./ui/card";
import { AlertCircle } from 'lucide-react';

const MAX_TEAM_MEMBERS = 4;

export default function TeamRegistrationForm() {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            teamName: '',
            teamLeadName: '',
            teamLeadPhone: '',
            teamLeadEmail: '',
            teamMembers: [{ name: '', registrationNumber: '', email: '', phone: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "teamMembers"
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://your-backend-endpoint.com/api/team/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the form data
            });

            if (!response.ok) {
                throw new Error('Failed to submit the form');
            }

            const responseData = await response.json();
            console.log('Form submitted successfully:', responseData);

            // You can add additional logic, like showing success messages or redirecting
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#131619] p-4 mt-8">
            <Card className="w-full max-w-2xl mx-auto bg-gray-800 text-gray-100 shadow-xl">
                <h1 className='mt-5 font-bold text-slate-400  text-3xl  text-center'>REGISTER</h1>
                <CardContent className="space-y-6 p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="teamName" className="text-gray-300">Team Name</Label>
                                <Input
                                    id="teamName"
                                    {...register("teamName", { required: "Team Name is required" })}
                                    placeholder="Enter team name"
                                    className="bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                />
                                {errors.teamName && <p className="text-pink-500 text-sm mt-1">{errors.teamName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="teamLeadName" className="text-gray-300">Team Lead Name</Label>
                                <Input
                                    id="teamLeadName"
                                    {...register("teamLeadName", { required: "Team Lead Name is required" })}
                                    placeholder="Enter team lead name"
                                    className="bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                />
                                {errors.teamLeadName && <p className="text-pink-500 text-sm mt-1">{errors.teamLeadName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="teamLeadPhone" className="text-gray-300">Team Lead Phone (Required)</Label>
                                <Input
                                    id="teamLeadPhone"
                                    {...register("teamLeadPhone", { required: "Team Lead Phone is required" })}
                                    placeholder="Enter team lead phone"
                                    className="bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                />
                                {errors.teamLeadPhone && <p className="text-pink-500 text-sm mt-1">{errors.teamLeadPhone.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="teamLeadEmail" className="text-gray-300">Team Lead Email</Label>
                                <Input
                                    id="teamLeadEmail"
                                    type="email"
                                    {...register("teamLeadEmail", {
                                        required: "Team Lead Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    placeholder="Enter team lead email"
                                    className="bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                />
                                {errors.teamLeadEmail && <p className="text-pink-500 text-sm mt-1">{errors.teamLeadEmail.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-purple-400">Team Members</h3>
                            {fields.map((field, index) => (
                                <div key={field.id} className="space-y-4 p-4 border border-gray-700 rounded-md bg-gray-750">
                                    <div className="space-y-2">
                                        <Label htmlFor={`teamMembers.${index}.name`} className="text-gray-300">Name</Label>
                                        <Input
                                            {...register(`teamMembers.${index}.name`, { required: "Name is required" })}
                                            placeholder="Enter member name"
                                            className="bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                        />
                                        {errors.teamMembers?.[index]?.name && <p className="text-pink-500 text-sm mt-1">{errors.teamMembers[index].name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`teamMembers.${index}.registrationNumber`} className="text-gray-300">Registration Number</Label>
                                        <Input
                                            {...register(`teamMembers.${index}.registrationNumber`, { required: "Registration Number is required" })}
                                            placeholder="Enter registration number"
                                            className="bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                        />
                                        {errors.teamMembers?.[index]?.registrationNumber && <p className="text-pink-500 text-sm mt-1">{errors.teamMembers[index].registrationNumber.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`teamMembers.${index}.email`} className="text-gray-300">Email</Label>
                                        <Input
                                            {...register(`teamMembers.${index}.email`, {
                                                required: "Email is required",
                                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                            })}
                                            placeholder="Enter email"
                                            type="email"
                                            className="bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                        />
                                        {errors.teamMembers?.[index]?.email && <p className="text-pink-500 text-sm mt-1">{errors.teamMembers[index].email.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`teamMembers.${index}.phone`} className="text-gray-300">Phone Number (Optional)</Label>
                                        <Input
                                            {...register(`teamMembers.${index}.phone`)}
                                            placeholder="Enter phone number (optional)"
                                            className="bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                                        />
                                    </div>

                                    {index > 0 && (
                                        <Button type="button" variant="destructive" onClick={() => remove(index)} className="bg-red-500 hover:bg-red-600 text-white mt-2">
                                            Remove Member
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {fields.length < MAX_TEAM_MEMBERS && (
                                <Button
                                    type="button"
                                    onClick={() => append({ name: '', registrationNumber: '', email: '', phone: '' })}
                                    className="mt-2 bg-green-500 hover:bg-green-600 text-white"
                                >
                                    Add Team Member
                                </Button>
                            )}
                            {fields.length >= MAX_TEAM_MEMBERS && (
                                <div className="flex items-center space-x-2 text-yellow-400">
                                    <AlertCircle size={20} />
                                    <p>Maximum team size reached (4 members)</p>
                                </div>
                            )}
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                            Register Team
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
