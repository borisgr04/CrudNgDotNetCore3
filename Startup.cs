using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ng_core_crud.Models;


namespace ng_core_crud
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<TaskContext>(opt => opt.UseInMemoryDatabase("TaskList"));

            services.AddDbContext<TaskContext>(opt => opt.UseSqlServer(@"Server=.\;Database=TaskDB;Trusted_Connection=True;"));

            services.AddControllersWithViews();

            // Register the Swagger services
            //services.AddSwaggerDocument(config =>
            //{
            //    config.PostProcess = document =>
            //    {
            //        document.Info.Version = "v1";
            //        document.Info.Title = "Task API";
            //        document.Info.Description = "A simple ASP.NET Core web API";
            //        document.Info.TermsOfService = "None";
            //        document.Info.Contact = new NSwag.SwaggerContact
            //        {
            //            Name = "Prog Web",
            //            Email = string.Empty,
            //            Url = "https://twitter.com/spboyer"
            //        };
            //        document.Info.License = new NSwag.SwaggerLicense
            //        {
            //            Name = "Use under LICX",
            //            Url = "https://example.com/license"
            //        };
            //    };
            //});

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            //app.UseSwagger();

            //// specifying the Swagger JSON endpoint.
            //// Swagger UI
            //app.UseSwaggerUI(options =>
            //{
            //    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Ejemplo Task v1");

            //    // Additional OAuth settings (See https://github.com/swagger-api/swagger-ui/blob/v3.10.0/docs/usage/oauth2.md)
            //    options.OAuthClientId("presupuestoOpenApiDev");
            //    options.OAuthClientSecret("presupuestoOpenApiSecret");
            //    options.OAuthRealm("Presupuesto-realm");
            //    options.OAuthAppName("Presupuesto Open Api");
            //    options.OAuthScopeSeparator(" ");
            //    options.OAuthUseBasicAuthenticationWithAccessCodeGrant();
            //    options.ConfigObject.DeepLinking = true;
            //});



            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
