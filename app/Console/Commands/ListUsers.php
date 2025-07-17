<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ListUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List all users in the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = \App\Models\User::all(['id', 'name', 'email']);
        
        if ($users->isEmpty()) {
            $this->info('No users found in the database.');
            return;
        }

        $this->info('Users in the database:');
        foreach ($users as $user) {
            $this->line("ID: {$user->id} - Name: {$user->name} - Email: {$user->email}");
        }
    }
}
