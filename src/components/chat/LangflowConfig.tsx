import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LangflowConfigProps {
  onConfigUpdate: (config: { apiKey: string; flowId: string; hostUrl: string }) => void;
}

export function LangflowConfig({ onConfigUpdate }: LangflowConfigProps) {
  const [apiKey, setApiKey] = useState('');
  const [flowId, setFlowId] = useState('62f396d2-3e45-4265-b10c-b18a63cd2b07');
  const [hostUrl, setHostUrl] = useState('https://langflow-ogonline-v2-u36305.vm.elestio.app');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('langflow-config');
    if (saved) {
      const config = JSON.parse(saved);
      setApiKey(config.apiKey || '');
      setFlowId(config.flowId || '62f396d2-3e45-4265-b10c-b18a63cd2b07');
      setHostUrl(config.hostUrl || 'https://langflow-ogonline-v2-u36305.vm.elestio.app');
      onConfigUpdate(config);
    }
  }, [onConfigUpdate]);

  const handleSave = () => {
    const config = { apiKey, flowId, hostUrl };
    localStorage.setItem('langflow-config', JSON.stringify(config));
    onConfigUpdate(config);
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Langflow Configuratie</CardTitle>
        <CardDescription>
          Voer je Langflow credentials in om de chat te activeren
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
          />
        </div>
        <div>
          <Label htmlFor="flow-id">Flow ID</Label>
          <Input
            id="flow-id"
            value={flowId}
            onChange={(e) => setFlowId(e.target.value)}
            placeholder="Flow ID"
          />
        </div>
        <div>
          <Label htmlFor="host-url">Host URL</Label>
          <Input
            id="host-url"
            value={hostUrl}
            onChange={(e) => setHostUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <Button onClick={handleSave} className="w-full">
          Configuratie Opslaan
        </Button>
      </CardContent>
    </Card>
  );
}