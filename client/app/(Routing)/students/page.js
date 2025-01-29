"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Label } from "@/components/ui/label"


const initialStudents = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
]

export default function ManageStudentsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [newStudent, setNewStudent] = useState({ name: "", email: "", phone: "" })
  const [editingStudent, setEditingStudent] = useState(null)

  const addStudent = () => {
    setStudents([...students, { ...newStudent, id: students.length + 1 }])
    setNewStudent({ name: "", email: "", phone: "" })
  }

  const updateStudent = () => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? editingStudent : s)))
      setEditingStudent(null)
    }
  }

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  return (
    <div className="sm:px-12 px-6 py-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Students</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Student</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={addStudent}>Add Student</Button>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2" onClick={() => setEditingStudent(student)}>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Student</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingStudent?.name}
                          onChange={(e) =>
                            setEditingStudent(editingStudent ? { ...editingStudent, name: e.target.value } : null)
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="edit-email"
                          value={editingStudent?.email}
                          onChange={(e) =>
                            setEditingStudent(editingStudent ? { ...editingStudent, email: e.target.value } : null)
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-phone" className="text-right">
                          Phone
                        </Label>
                        <Input
                          id="edit-phone"
                          value={editingStudent?.phone}
                          onChange={(e) =>
                            setEditingStudent(editingStudent ? { ...editingStudent, phone: e.target.value } : null)
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={updateStudent}>Update Student</Button>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteStudent(student.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

