import React from "react";
import { Trash2 } from "lucide-react";

const TraefikConfig = ({ router, onUpdate, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Traefik Configuration</h3>
        <button onClick={onDelete} className="text-red-500 hover:text-red-600">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Router Name</label>
          <input
            type="text"
            value={router.name}
            onChange={(e) => onUpdate({ ...router, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., web"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Domain</label>
          <input
            type="text"
            value={router.domain}
            onChange={(e) => onUpdate({ ...router, domain: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Port</label>
          <input
            type="text"
            value={router.port}
            onChange={(e) => onUpdate({ ...router, port: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., 8080"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Entrypoints</label>
          <select
            value={router.entrypoint}
            onChange={(e) =>
              onUpdate({ ...router, entrypoint: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          >
            <option value="web">web</option>
            <option value="websecure">websecure</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={router.tls}
              onChange={(e) => onUpdate({ ...router, tls: e.target.checked })}
              className="rounded text-indigo-600"
            />
            <span className="text-sm font-medium">Enable TLS</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Service Type</label>
          <select
            value={router.serviceType}
            onChange={(e) =>
              onUpdate({ ...router, serviceType: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          >
            <option value="loadbalancer">LoadBalancer</option>
            <option value="service">Service</option>
          </select>
        </div>

        {router.tls && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">TLS Resolver</label>
            <input
              type="text"
              value={router.tlsResolver}
              onChange={(e) =>
                onUpdate({ ...router, tlsResolver: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g., myresolver"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TraefikConfig;
