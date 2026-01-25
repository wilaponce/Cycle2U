'use client';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert('Login required'); return; }
    const { data, error } = await supabase.storage.from('uploads').upload(`user-${user.id}/${file.name}`, file);
    if (error) alert(error.message); else alert('File uploaded successfully');
  };

  return (<div className='p-6'><h1 className='text-xl mb-4'>Upload Document</h1><input type='file' onChange={e=>setFile(e.target.files[0])}/><button onClick={handleUpload} className='bg-green-500 text-white p-2'>Upload</button></div>);
}