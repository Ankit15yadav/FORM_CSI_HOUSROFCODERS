"use client"

import { useState } from 'react'
import { Button } from "./ui/Button"
import { Input } from "./ui/input"
import { Label } from "./ui/Label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/Dialog"
import { Menu } from "lucide-react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-xl font-bold text-gray-800">HOUSE OF CODER</span>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Are you a member of CSI?</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>CSI Member Login</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phone" className="text-right">
                                            Phone
                                        </Label>
                                        <Input id="phone" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="csi-id" className="text-right">
                                            CSI ID
                                        </Label>
                                        <Input id="csi-id" className="col-span-3" />
                                    </div>
                                </div>
                                <Button className="w-full">Login</Button>
                            </DialogContent>
                        </Dialog>
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">Are you a member of CSI?</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>CSI Member Login</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phone-mobile" className="text-right">
                                            Phone
                                        </Label>
                                        <Input id="phone-mobile" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="csi-id-mobile" className="text-right">
                                            CSI ID
                                        </Label>
                                        <Input id="csi-id-mobile" className="col-span-3" />
                                    </div>
                                </div>
                                <Button className="w-full">Login</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            )}
        </nav>
    )
}