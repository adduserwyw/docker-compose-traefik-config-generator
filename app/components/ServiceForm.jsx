"use client";
import React from "react";
import { Trash2 } from "lucide-react";

const ServiceForm = ({ service, onUpdate, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Service Configuration</h3>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Service Name
          </label>
          <input
            type="text"
            value={service.serviceName}
            onChange={(e) =>
              onUpdate({ ...service, serviceName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., webapp"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image Name
          </label>
          <input
            type="text"
            value={service.imageName}
            onChange={(e) =>
              onUpdate({ ...service, imageName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., nginx"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image Tag
          </label>
          <input
            type="text"
            value={service.imageTag}
            onChange={(e) => onUpdate({ ...service, imageTag: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., latest"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Domain
          </label>
          <input
            type="text"
            value={service.domain}
            onChange={(e) => onUpdate({ ...service, domain: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., app.example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Port
          </label>
          <input
            type="text"
            value={service.port}
            onChange={(e) => onUpdate({ ...service, port: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 3000"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={service.enableTraefik}
              onChange={(e) =>
                onUpdate({ ...service, enableTraefik: e.target.checked })
              }
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Enable Traefik
            </span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={service.enableVolumes}
              onChange={(e) =>
                onUpdate({ ...service, enableVolumes: e.target.checked })
              }
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Enable Volumes
            </span>
          </label>
        </div>

        {service.enableVolumes && (
          <div className="space-y-2 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Volume Mount Path
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={service.volumePath}
                onChange={(e) =>
                  onUpdate({ ...service, volumePath: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., ./data:/app/data"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceForm;
