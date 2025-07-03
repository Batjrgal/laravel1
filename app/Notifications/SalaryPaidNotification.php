<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class SalaryPaidNotification extends Notification
{
    use Queueable;

    protected $salary;
    protected $by;

    public function __construct($salary, $by)
    {
        $this->salary = $salary;
        $this->by = $by;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $salaryDate = $this->salary->created_at ? $this->salary->created_at->format('Y-m-d') : '';
        $amount = number_format($this->salary->total_price);
        return [
            'message' => 'Таны ' . $salaryDate . ' өдрийн цалин ' . $amount . '₮  шилжүүллээ.',
            'salary_id' => $this->salary->id,
            'amount' => $this->salary->total_price,
            'user_id' => $this->salary->user_id,
            'updated_by' => $this->by,
            'status' => $this->salary->status,
        ];
    }
}