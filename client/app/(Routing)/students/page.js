"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;




export default function ManageStudentsPage() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", phone: "" })
  const [editingStudent, setEditingStudent] = useState(null)


  const fetchInitialStudents = async () => {
    try {
      const response = await axios.get(BASEURL + "/api/students", { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      return response.data
    } catch (error) {
      toast.error("Failed to add student.", error);
      return students
    }
  }

  const insertStudents = async (name, email, phone) => {
    try {
      const response = await axios.post(BASEURL + "/api/register", { name, email, phone }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      return response.data;
    } catch (error) {
      toast.error("Failed to add student.");
      return students;
    }
  }

  useEffect(() => {
    const getStudents = async () => {
      const response = await fetchInitialStudents()
      const { students } = response;
      setStudents(students)
    }
    getStudents()
  }, [])





  const addStudent = async () => {
    const { name, email, phone } = newStudent;
    const data = await insertStudents(name, email, phone);
    if (data.message === "Student registered successfully") {
      toast.success(data.message);
      setStudents([...students, { ...newStudent, student_id: students.length + 2 }])
      setNewStudent({ name: "", email: "", phone: "" })
    }
  }

  const updateStudent = async () => {
    if (!editingStudent) return;

    try {
      const response = await axios.put(BASEURL + `/api/students/${editingStudent.student_id}`, {name: editingStudent.name,
        email: editingStudent.email, phone: editingStudent.phone, }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
      
      if (response.data.message === "Student updated successfully") {
        toast.success("Student updated successfully");

        // Update the state
        setStudents(
          students.map((s) =>
            s.student_id === editingStudent.student_id ? editingStudent : s
          )
        );
        setEditingStudent(null); // Clear the editing state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update student.");
    }
  };


  return (

    <div className="sm:px-12 px-6 py-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Students</h1>
      <ToastContainer />
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
            <TableRow key={student.student_id}>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

