import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Mail,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

interface ReservationFormProps {
  restaurantName: string;
  restaurantPhone?: string;
  onReservationSuccess?: () => void;
}

export function ReservationForm({ 
  restaurantName, 
  restaurantPhone,
  onReservationSuccess 
}: ReservationFormProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: user?.email || '',
    phone: '',
    specialRequests: ''
  });

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Get date 30 days from now
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to make a reservation');
      return;
    }

    if (!formData.date || !formData.time || !formData.name || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API call to create the reservation
      const reservationData = {
        restaurant: restaurantName,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        specialRequests: formData.specialRequests,
        status: 'pending',
        confirmationNumber: `TG${Date.now().toString().slice(-6)}`
      };

      toast.success(
        `Reservation request submitted! Confirmation #${reservationData.confirmationNumber}`,
        {
          description: `${restaurantName} will contact you within 2 hours to confirm your reservation.`
        }
      );

      // Reset form
      setFormData({
        date: '',
        time: '',
        guests: '2',
        name: '',
        email: user?.email || '',
        phone: '',
        specialRequests: ''
      });

      onReservationSuccess?.();
    } catch (error) {
      toast.error('Failed to submit reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.date && formData.time && formData.name && formData.phone;

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calendar className="h-6 w-6 text-primary" />
          Make a Reservation
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Instant Booking
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Reserve your table at {restaurantName}. We'll confirm your booking within 2 hours.
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                min={today}
                max={maxDateString}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time *
              </Label>
              <Select 
                value={formData.time} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Guests *
              </Label>
              <Select 
                value={formData.guests} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </SelectItem>
                  ))}
                  <SelectItem value="10+">10+ Guests (Call Required)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@example.com"
            />
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
              placeholder="Dietary restrictions, celebration details, seating preferences..."
              rows={3}
            />
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Reservation Policy
                </p>
                <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Reservations are held for 15 minutes past the reserved time</li>
                  <li>• Cancellations must be made at least 2 hours in advance</li>
                  <li>• Large parties (8+) may require a deposit</li>
                  <li>• We'll send confirmation details to your email and phone</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={!isFormValid || loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Request Reservation
                </>
              )}
            </Button>
            
            {restaurantPhone && (
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open(`tel:${restaurantPhone}`)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Instead
              </Button>
            )}
          </div>

          {/* Alternative Contact */}
          {restaurantPhone && (
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prefer to call? Contact {restaurantName} directly at{' '}
                <a 
                  href={`tel:${restaurantPhone}`}
                  className="font-medium text-primary hover:underline"
                >
                  {restaurantPhone}
                </a>
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}