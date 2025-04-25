'use client'
 
 import { useState } from 'react'
 
 export default function FormPage() {
   const [message, setMessage] = useState('')
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     subject: '',
     message: ''
   })
 
   // Handle form input changes
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target
     setFormData(prev => ({
       ...prev,
       [name]: value
     }))
   }
 
   // Handle GET request form
   const handleGetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     const queryParams = new URLSearchParams(formData)
     window.location.search = queryParams.toString()
   }
 
   // Handle POST request form
   const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     try {
       const response = await fetch('/api/form', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
       })
 
       if (response.ok) {
         setMessage('Form submitted successfully!')
         setFormData({ name: '', email: '', subject: '', message: '' })
       } else {
         setMessage('Error submitting form')
       }
     } catch (error) {
       setMessage('Error submitting form')
     }
   }
 
   return (
     <div className="max-w-4xl mx-auto p-6">
       <h1 className="text-3xl font-bold mb-8">Contact Form</h1>
 
       {/* GET Request Form */}
       <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h2 className="text-2xl font-semibold mb-4">GET Request Form</h2>
         <p className="text-gray-600 dark:text-gray-400 mb-4">
           This form demonstrates a GET request. Notice how the form data appears in the URL.
         </p>
         <form onSubmit={handleGetSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium mb-2">Name:</label>
             <input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
               className="w-full p-2 border rounded"
               required
             />
           </div>
           <div>
             <label className="block text-sm font-medium mb-2">Email:</label>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className="w-full p-2 border rounded"
               required
             />
           </div>
           <button
             type="submit"
             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
           >
             Submit GET Request
           </button>
         </form>
       </section>
 
       {/* POST Request Form */}
       <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
         <h2 className="text-2xl font-semibold mb-4">POST Request Form</h2>
         <p className="text-gray-600 dark:text-gray-400 mb-4">
           This form demonstrates a POST request. The data is sent securely in the request body.
         </p>
         <form onSubmit={handlePostSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium mb-2">Name:</label>
             <input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
               className="w-full p-2 border rounded"
               required
             />
           </div>
           <div>
             <label className="block text-sm font-medium mb-2">Email:</label>
             <input
               type="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               className="w-full p-2 border rounded"
               required
             />
           </div>
           <div>
             <label className="block text-sm font-medium mb-2">Subject:</label>
             <input
               type="text"
               name="subject"
               value={formData.subject}
               onChange={handleChange}
               className="w-full p-2 border rounded"
               required
             />
           </div>
           <div>
             <label className="block text-sm font-medium mb-2">Message:</label>
             <textarea
               name="message"
               value={formData.message}
               onChange={handleChange}
               className="w-full p-2 border rounded h-32"
               required
             />
           </div>
           <button
             type="submit"
             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
           >
             Submit POST Request
           </button>
         </form>
         {message && (
           <div className={`mt-4 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
             {message}
           </div>
         )}
       </section>
     </div>
   )
 } 