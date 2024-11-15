#!/bin/bash

# Function to recursively scan a directory
scan_directory() {
    local dir="$1"
    local indent="$2"

    # List all items in the directory
    for item in "$dir"/*; do
        # Check if the item exists
        if [ -e "$item" ]; then
            # Check if the item is a directory
            if [ -d "$item" ]; then
                # Print the directory name with indentation
                echo "${indent}$(basename "$item")/"
                # Recursive call with increased indentation
                scan_directory "$item" "$indent  "
            else
                # Print the file name with indentation
                echo "${indent}$(basename "$item")"
            fi
        fi
    done
}

# Starting point: the current directory
echo "Scanning contents of the current directory:"
scan_directory "." ""




Scanning contents of the current directory:
Dockerfile
docker-compose.yml
package-lock.json
package.json
producer/
scan.sh
src/
  app.module.ts
  main.ts
  notification-schedule/
    dto/
      create-notification-schedule.dto.ts
      update-notification-schedule.dto.ts
    entities/
      notification-schedule.entity.ts
    notification-cron.service.ts
    notification-schedule.controller.ts
    notification-schedule.module.ts
    notification-schedule.service.ts
  rabbitmq/
    rabbitmq.module.ts
tsconfig.json
right now the producer is empty
I intend on moving the current code to producer 
and later ma including a consumer as well
the current dockerfile and docker compose is as such .
assuming I have moved the code to producer and also now have the consumer setup .
Scanning contents of the current directory:
docker-compose.yml
producer/
    Dockerfile
    package-lock.json
    package.json
    src/
    app.module.ts
    main.ts
    notification-schedule/
        dto/
        create-notification-schedule.dto.ts
        update-notification-schedule.dto.ts
        entities/
        notification-schedule.entity.ts
        notification-cron.service.ts
        notification-schedule.controller.ts
        notification-schedule.module.ts
        notification-schedule.service.ts
    rabbitmq/
        rabbitmq.module.ts
    tsconfig.json
consumer/
    Dockerfile
    package-lock.json
    package.json
    src/
    app.module.ts
    main.ts
    notification-schedule/
        dto/
        create-notification-schedule.dto.ts
        update-notification-schedule.dto.ts
        entities/
        notification-schedule.entity.ts
        notification-cron.service.ts
        notification-schedule.controller.ts
        notification-schedule.module.ts
        notification-schedule.service.ts
    rabbitmq/
        rabbitmq.module.ts
    tsconfig.json
scan.sh