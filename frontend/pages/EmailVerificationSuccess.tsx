import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function EmailVerificationConfirm() {
  const router = useRouter();
  const { token } = router.query;

  const handleConfirm = async () => {
    try {
      const res = await fetch('/api/Account/VerifyEmailToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      if (res.ok) {
        toast.success('Email verified successfully');
        router.push('/email-verification-success');
      } else {
        toast.error('Invalid or expired token');
      }
    } catch (err) {
      toast.error('Error verifying email');
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Confirm Email Verification</h1>
      <button onClick={handleConfirm} className="bg-green-600 text-white px-4 py-2 rounded">
        Verify Email
      </button>
    </div>
  );
}
