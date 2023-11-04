
<# 
.SYNOPSIS
    A build script to train and process ML alogorithm.

.DESCRIPTION 

    The ml-cloud-playground porject has the following project structure.

    - ml-training - for training ML model
    - ml-processing - for scoring end point
    - ml-app - for integeration point b/n ml-processing and other business logic 
    - ml-frontend - for front-end consumer of ML algorithm
 
.Parameter $train 
    Defaults to $true. If $true it will train and export model beforint starting other apps.
#>
param(
    [Parameter(Mandatory = $false)]
    $train = $true
)

if ($train -eq $true)
{
    # Build images
    docker-compose --file ./ml-train.yml build --no-cache

    # Run training
    $container_id = docker run -d -t ml-training
    docker logs $container_id -f

    # Export trained model
    write-host "docker cp $container_id`:/app/ml-models $pwd\ml-processing"
    docker cp $container_id`:/app/ml-models $pwd\ml-processing

    # Stop training container
    docker stop $container_id
}

# Run processing
docker-compose --file ./ml-process.yml build  --no-cache 
docker-compose --file ./ml-process.yml up