<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SalaryPaid implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userId;
    public $adminIds;
    public $notification;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($userId, $adminIds, $notification)
    {
        $this->userId = $userId;
        $this->adminIds = $adminIds;
        $this->notification = $notification;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $channels = [new PrivateChannel('App.Models.User.' . $this->userId)];
        foreach ($this->adminIds as $adminId) {
            $channels[] = new PrivateChannel('App.Models.User.' . $adminId);
        }
        return $channels;
    }

    public function broadcastWith()
    {
        return ['notification' => $this->notification];
    }
}
