"use client";
import React, { useState } from "react";
import Head from "next/head";
import { Copy, Plus, Download,Github }from "lucide-react";
import Link from "next/link";
import yaml from "js-yaml";
import ServiceForm from "./components/ServiceForm";
import TraefikConfig from "./components/TraefikConfig";

export default function Home() {
  const [services, setServices] = useState([
    {
      id: 1,
      serviceName: "",
      imageName: "",
      imageTag: "latest",
      domain: "",
      port: "",
      enableTraefik: true,
      enableVolumes: false,
      volumePath: "",
    },
  ]);
  const [routers, setRouters] = useState([
    {
      id: 1,
      name: "",
      domain: "",
      port: "",
      entrypoint: "websecure",
      tls: true,
      tlsResolver: "myresolver",
      serviceType: "loadbalancer",
    },
  ]);

  const updateRouter = (updatedRouter) => {
    setRouters(
      routers.map((router) =>
        router.id === updatedRouter.id ? updatedRouter : router,
      ),
    );
  };

  const deleteRouter = (routerId) => {
    if (routers.length > 1) {
      setRouters(routers.filter((router) => router.id !== routerId));
    }
  };

  const generateLabels = () => {
    let config = "";
    routers.forEach((router) => {
      const labels = [
        `      - "traefik.enable=true"`,
        `      - "traefik.http.routers.${router.name}.entrypoints=${router.entrypoint}"`,
        `      - "traefik.http.routers.${router.name}.rule=Host(\`${router.domain}\`)"`,
        `      - "traefik.http.services.${router.name}.loadbalancer.server.port=${router.port}"`,
      ];

      if (router.tls) {
        labels.push(`      - "traefik.http.routers.${router.name}.tls=true"`);
        if (router.tlsResolver) {
          labels.push(
            `      - "traefik.http.routers.${router.name}.tls.certresolver=${router.tlsResolver}"`,
          );
        }
      }

      config += `    labels:\n${labels.join("\n")}\n\n`;
    });
    return config;
  };

  const [generatedYaml, setGeneratedYaml] = useState("");
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const addService = () => {
    setServices([
      ...services,
      {
        id: Date.now(),
        serviceName: "",
        imageName: "",
        imageTag: "latest",
        domain: "",
        port: "",
        enableTraefik: true,
        enableVolumes: false,
        volumePath: "",
      },
    ]);
  };

  const updateService = (updatedService) => {
    setServices(
      services.map((service) =>
        service.id === updatedService.id ? updatedService : service,
      ),
    );
  };

  const deleteService = (serviceId) => {
    if (services.length > 1) {
      setServices(services.filter((service) => service.id !== serviceId));
    }
  };

  const generateYaml = () => {
    let traefikYaml = "";
    const compose = {
      version: "3",
      networks: {
        default: {
          external: true,
          name: "traefik_network",
        },
      },
      services: {},
    };

    services.forEach((service) => {
      compose.services[service.serviceName] = {
        image: `${service.imageName}:${service.imageTag}`,
        container_name: service.serviceName,
        restart: "unless-stopped",
        networks: ["traefik_network"],
        environment: ["TZ"],
      };

      if (service.enableVolumes && service.volumePath) {
        compose.services[service.serviceName].volumes = [service.volumePath];
      }

      if (service.enableTraefik) {
      }
    });

    const yamlStr = yaml.dump(compose);
    const labels = generateLabels();
    setGeneratedYaml(yamlStr + labels);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedYaml);
      setShowCopyAlert(true);
      setTimeout(() => setShowCopyAlert(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadYaml = () => {
    const blob = new Blob([generatedYaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "docker-compose.yml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Docker Compose Generator</title>
        <meta
          name="description"
          content="Generate Docker Compose files with Traefik support"
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-700 mb-8">
            Docker Compose Generator
          </h1>

          <div className="flex flex-row text-slate-700 space-x-3">
            <div className="flex-grow space-y-6">
              {services.map((service) => (
                  <ServiceForm
                      key={service.id}
                      service={service}
                      onUpdate={updateService}
                      onDelete={() => deleteService(service.id)}
                  />
              ))}
              {routers.map((router) => (
                  <TraefikConfig
                      key={router.id}
                      router={router}
                      onUpdate={updateRouter}
                      onDelete={() => deleteRouter(router.id)}
                  />
              ))}

              <button
                  onClick={addService}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5"/>
                <span>Add Service</span>
              </button>

              <div className="flex space-x-4">
                <button
                    onClick={generateYaml}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Generate YAML
                </button>

                {generatedYaml && (
                    <button
                        onClick={downloadYaml}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4"/>
                      <span>Download YAML</span>
                    </button>
                )}
              </div>

              {showCopyAlert && (
                  <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                    YAML copied to clipboard!
                  </div>
              )}
            </div>
            <div>
              {generatedYaml && (
                  <div className="relative">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <button
                          onClick={copyToClipboard}
                          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-md transition-colors"
                          title="Copy to clipboard"
                      >
                        <Copy className="w-5 h-5"/>
                      </button>
                      <pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">
                      {generatedYaml}
                    </pre>
                    </div>
                  </div>
              )}
            </div>

          </div>

          <footer className="w-full py-4 bg-primary text-slate-700">
            <div className="container mx-auto flex justify-center items-center space-x-2">
              <Link
                  href={`https://github.com/adduserwyw/docker-compose-traefik-config-generator`}
                  className="text-sm font-semibold hover:underline flex items-center space-x-1"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <p>©adduserwyw {new Date().getFullYear()} - All right reserved</p>
              </Link>
            </div>
          </footer>
        </div>

      </main>
    </div>
  );
}
