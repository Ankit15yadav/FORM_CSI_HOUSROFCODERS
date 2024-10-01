import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "./ui/Button";
import { Input } from "./ui/input";
import { Label } from "./ui/Label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/Dialog";
import { Menu } from "lucide-react";
import toast from 'react-hot-toast';

export default function Navbar({ isMember, setIsMember }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog state
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isMember, setIsMember] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch('http://192.168.1.9:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Invalid login credentials');
            }

            toast.success("Welcome Member You are eligible for the discounted prize",
                { duration: 3000 }
            )

            const responseData = await response.json();
            setIsLoggedIn(true);
            setIsMember(responseData.isMember);

            // alert(responseData.isMember ? "Welcome, Member!" : "Welcome, Guest!");

            // Close the modal when successfully logged in
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Login failed:', error);
            // alert('Login failed. Please try again.');
            toast.error("Wrong Credentials")
        }
    };

    return (
        <nav className="bg-darkBrown-700 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-3xl font-bold text-yellow-200">HOUSE OF THE CODERS</span>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {/* Only show the button if not logged in or not a member */}
                        {!isLoggedIn && !isMember && (
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}
                                className="bg-yellow-200"
                            >
                                <DialogTrigger asChild>
                                    <Button variant="outline"
                                        className="hover:bg-yellow-100"
                                    >Are you a member of CSI?</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>CSI Member Login</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="phone" className="text-right">
                                                Phone
                                            </Label>
                                            <Input
                                                id="phone"
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^\d{10}$/,
                                                        message: "Please enter a valid 10-digit phone number"
                                                    }
                                                })}
                                                placeholder="12345-67890"
                                                className="col-span-3"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="csi-id" className="text-right">
                                                CSI ID
                                            </Label>
                                            <Input
                                                id="csi-id"
                                                {...register("csiId", {
                                                    required: "CSI ID is required",
                                                    minLength: {
                                                        value: 5,
                                                        message: "CSI ID must be at least 5 characters long"
                                                    }
                                                })}
                                                placeholder="8 digits CSI id"
                                                className="col-span-3"
                                            />
                                            {errors.csiId && <p className="text-red-500 text-sm">{errors.csiId.message}</p>}
                                        </div>
                                        <Button type="submit" className="w-full">Login</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                    <div className="sm:hidden flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open main menu</span>
                        </Button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {!isLoggedIn && !isMember && (
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start">Are you a member of CSI?</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>CSI Member Login</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="phone-mobile" className="text-right">
                                                Phone
                                            </Label>
                                            <Input
                                                id="phone-mobile"
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^\d{10}$/,
                                                        message: "Please enter a valid 10-digit phone number"
                                                    }
                                                })}
                                                className="col-span-3"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="csi-id-mobile" className="text-right">
                                                CSI ID
                                            </Label>
                                            <Input
                                                id="csi-id-mobile"
                                                {...register("csiId", {
                                                    required: "CSI ID is required",
                                                    minLength: {
                                                        value: 5,
                                                        message: "CSI ID must be at least 5 characters long"
                                                    }
                                                })}
                                                className="col-span-3"
                                            />
                                            {errors.csiId && <p className="text-red-500 text-sm">{errors.csiId.message}</p>}
                                        </div>
                                        <Button type="submit" className="w-full">Login</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
